/*
{
  "name": "todo-txt-js",
  "version": "0.2.3",
  "author": "Michael Roufa <mike@roufa.com>",
  "description": "A todo.txt parser implemented in JavaScript.",
  "repository": "https://github.com/roufamatic/todo-txt-js"
  "license": "MIT",
}
*/

export let TodoTxt = (function () {
  let SORT_ASC = 'asc';
  let SORT_DESC = 'desc';
  let reTrim = /^\s+|\s+$/g;
  let reSplitSpaces = /\s+/;
  let reFourDigits = /^\d{4}$/;
  let reTwoDigits = /^\d{2}$/;
  let rePriority = /^\([A-Z]\)$/;
  let reBlankLine = /^\s*$/;
  let reAddOn = /[^:]+:[^:]/;

  let create = function () {
    return parseFile('');
  };

  let parseFile = function (blob) {
    let getLineNumber = function (task) {
      for (let j = 0; j < items.length; j++) {
        if (items[j].id() === task.id()) return j + 1;
      }
      return 0;
    };

    let lines = blob.split('\n');
    let items = [];
    let output = {};
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (reBlankLine.test(line)) continue;
      items.push(parseLineInternal(line, getLineNumber));
    }
    output.render = function (query, sortFields) {
      let itemsToRender = output.items(query, sortFields);

      let txt = '';
      for (let i = 0; i < itemsToRender.length; i++) {
        if (txt !== '') txt += '\n';
        txt += itemsToRender[i].render();
      }
      return txt;
    };
    output.items = function (query, sortFields) {
      // A query is an AND search -- all properties in that object must be found on the item for the item to match.
      // Query property values may be functions. In this case, the property value for each item will be passed into the function,
      // and the function should return a boolean indicating if the item matches or not.

      let output = [];
      if (!query) query = {};
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (isItemInQuery(item, query)) output.push(item);
      }

      if (isArray(sortFields)) {
        // Validate the sort fields.
        for (let i = 0; i < sortFields.length; i++) {
          let sort = sortFields[i];
          if (typeof sort === 'string') {
            sortFields[i] = sort = { field: sort, direction: SORT_ASC };
          }
          if (!sort.field) {
            throw new Error('Invalid sort ' + sort);
          }
          let validFields = [
            'priority',
            'createdDate',
            'completedDate',
            'isComplete',
            'lineNumber',
          ];
          if (validFields.indexOf(sort.field) === -1) {
            throw new Error('Cannot sort by this field: ' + sort.field);
          }
          if (sort.direction !== SORT_DESC) sort.direction = SORT_ASC;
        }

        let sortError = null;
        let compare = function (a, b, sort) {
          let aVal = a[sort.field]();
          let bVal = b[sort.field]();

          let sortResult = (function () {
            if (aVal === bVal) return 0;

            // Reminder: we validated sort.field above, so default can cover all string sorting cases.
            switch (sort.field) {
              case 'isComplete':
                if (sort.direction === SORT_DESC) {
                  return aVal ? 1 : -1;
                }
                return aVal ? -1 : 1;
              case 'createdDate':
              case 'completedDate':
                // put nulls at the bottom regardless of whether we sort ascending or descending.
                if (aVal === null) return 1;
                if (bVal === null) return -1;
                if (aVal.getTime() === bVal.getTime()) return 0;
                if (sort.direction === SORT_DESC) {
                  return aVal < bVal ? 1 : -1;
                }
                return aVal < bVal ? -1 : 1;
              case 'priority':
                // nulls go at the end when ascending, and at the beginning when descending.
                if (aVal === null) return sort.direction === SORT_DESC ? -1 : 1;
                if (bVal === null) return sort.direction === SORT_DESC ? 1 : -1;

                if (sort.direction === SORT_DESC) {
                  return aVal < bVal ? 1 : -1;
                }
                return aVal < bVal ? -1 : 1;
              default:
                throw new Error('Unhandled sort.field ' + sort.field);
            }
          })();
          return sortResult;
        };
        let sorter = function (a, b) {
          try {
            for (let i = 0; i < sortFields.length; i++) {
              if (sortFields[i].field === 'lineNumber') {
                let desc = sortFields[i].direction === SORT_DESC;
                if (a.lineNumber() === b.lineNumber()) {
                  return 0;
                } else if (a.lineNumber() < b.lineNumber()) {
                  return desc ? 1 : -1;
                } else {
                  return desc ? -1 : 1;
                }
              }

              let sortResult = compare(a, b, sortFields[i]);
              if (sortResult !== 0) return sortResult;
            }
          } catch (e) {
            sortError = e;
            return 0;
          }
          // If we're here, it means the two items sorted identically. Do one last check of the item number
          return a.lineNumber() < b.lineNumber() ? -1 : 1;
        };
        output.sort(sorter);
        if (sortError) throw new Error(sortError);
      }
      return output;
    };

    output.length = items.length;

    output.removeItem = function (itemToRemove, allMatches) {
      if (typeof itemToRemove.render === 'function')
        itemToRemove = itemToRemove.render();
      // Copy the array.
      let newItems = [];
      for (let i = 0; i < items.length; i++) {
        newItems[i] = items[i];
      }
      let spliceIndex = 0;
      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].render() === itemToRemove) {
          items.splice(spliceIndex, 1);
          if (!allMatches) break;
        } else {
          spliceIndex++;
        }
      }
      output.length = items.length;
    };

    output.addItem = function (item) {
      if (typeof item.render === 'function') item = item.render();
      item = parseLineInternal(item, getLineNumber);
      if (!item.createdDate()) item.setCreatedDate(new Date());

      items.push(item);
      output.length = items.length;
      return item;
    };

    output.collections = function (includeCompleted) {
      let contextsObj = {},
        projectsObj = {},
        contexts = [],
        projects = [],
        i,
        j,
        k;
      for (i = 0; i < items.length; i++) {
        if (!includeCompleted && items[i].isComplete()) continue;
        let itemContexts = items[i].contexts();
        let itemProjects = items[i].projects();

        for (j = 0; j < itemContexts.length; j++) {
          contextsObj[itemContexts[j]] = true;
        }
        for (j = 0; j < itemProjects.length; j++) {
          projectsObj[itemProjects[j]] = true;
        }
      }
      for (k in contextsObj) {
        if (contextsObj[k] === true) contexts.push(k);
      }
      for (k in projectsObj) {
        if (projectsObj[k] === true) projects.push(k);
      }
      contexts.sort();
      projects.sort();

      return { contexts: contexts, projects: projects };
    };
    return output;
  };

  let isItemInQuery = function (item, query) {
    for (let k in query) {
      if (!query.hasOwnProperty(k)) continue;
      if (!item.hasOwnProperty(k))
        throw new Error('This property is invalid for query: ' + k);
      let queryProp = query[k];
      let itemProp = item[k]();
      let queryPropType = 'direct';
      if (typeof queryProp === 'function') queryPropType = 'function';
      else if (isArray(queryProp)) queryPropType = 'containsAll';

      switch (queryPropType) {
        case 'function':
          // Pass the property value into the function. If it returns false, go home. If true, move onto the next property.
          if (!queryProp(itemProp)) return false;
          break;
        case 'containsAll':
          // Make sure the source is an array as well. If not, throw.
          if (!isArray(itemProp))
            throw new Error('Cannot pass array for non-array property');

          // Make sure each and every item in the query is also in the item -- an AND search.
          // (To do an OR search, use the function capability above and write your own comparer.)
          for (let i = 0; i < queryProp.length; i++) {
            let foundIt = false;
            for (let j = 0; j < itemProp.length; j++) {
              if (queryProp[i] === itemProp[j]) {
                foundIt = true;
                break;
              }
            }
            if (!foundIt) return false;
          }
          break;
        case 'direct':
          if (isDate(queryProp) && isDate(itemProp)) {
            return isSameCalendarDate(queryProp, itemProp);
          }
          if (queryProp !== itemProp) return false;

          break;
        default:
          throw new Error('unexpected queryPropType: ' + queryPropType);
      }
    }
    return true;
  };

  let parseLineInternal = function (line, lineNumberGetter) {
    // Note: this is slightly different behavior than parseFile.
    // parseFile removes blank lines before sending them into this function.
    // However, if parseLine is called directly with blank input, it will return an empty todo item.
    // In other words, "parseLine()" functions like a line constructor.

    let tokens;
    let readLine = function (text) {
      line = text.replace(reTrim, '');
      tokens = [];
      if (line !== '') {
        tokens = line.split(reSplitSpaces);
      }
    };

    if (!line || reBlankLine.test(line)) return null;
    readLine(line);

    let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );

    let output = {};
    output.render = function () {
      return tokens.join(' ');
    };
    output.replaceWith = function (text) {
      if (!text || reBlankLine.test(text))
        throw new Error('Cannot replace a line with nothing.');
      readLine(text);
    };
    output.id = function () {
      return id;
    };
    output.isComplete = function () {
      return tokens.length > 0 && tokens[0] === 'x';
    };
    output.completedDate = function () {
      if (!output.isComplete()) return null;
      if (tokens.length < 2) return null;
      return tokenToDate(tokens[1]);
    };
    output.priority = function () {
      let pos = 0;
      if (output.isComplete()) {
        pos++;
        if (output.completedDate()) {
          pos++;
        }
      }
      if (tokens.length <= pos) return null;
      let token = tokens[pos];
      if (!rePriority.test(token)) return null;
      return token[1];
    };
    output.createdDate = function () {
      let pos = 0;
      if (output.isComplete()) pos++;
      if (output.completedDate()) pos++;
      if (output.priority()) pos++;
      if (tokens.length <= pos) return null;
      let token = tokens[pos];
      return tokenToDate(token);
    };
    output.contexts = function () {
      let seen = {};
      for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token.length < 2) continue;
        if (token[0] === '@') seen[token] = true;
      }
      return keys(seen, 'boolean');
    };
    output.projects = function () {
      let seen = {};
      for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token.length < 2) continue;
        if (token[0] === '+') seen[token] = true;
      }
      return keys(seen, 'boolean');
    };
    output.addons = function () {
      let addons = {};
      for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (!reAddOn.test(token)) continue;
        // It's an add-on!
        let bits = token.split(':');
        let tail = bits.splice(1);
        let key = bits[0];
        let val = tail.join(':'); // Colons beyond the first are just part of the value.
        if (!addons[key]) addons[key] = val;
        else if (!isArray(addons[key])) {
          let oldValue = addons[key];
          addons[key] = [oldValue, val];
        } else {
          addons[key].push(val);
        }
      }
      return addons;
    };
    output.textTokens = function () {
      let arr = [];
      let startPos = 0;
      if (output.isComplete()) startPos++;
      if (output.completedDate()) startPos++;
      if (output.priority()) startPos++;
      if (output.createdDate()) startPos++;
      for (let i = startPos; i < tokens.length; i++) {
        let token = tokens[i];
        if (token[0] === '@' || token[0] === '+' || reAddOn.test(token))
          continue;
        arr.push(token);
      }
      return arr;
    };
    output.lineNumber = function () {
      return lineNumberGetter(this);
    };

    output.completeTask = function () {
      if (output.isComplete()) return;
      tokens.splice(0, 0, 'x', toIsoDate());
    };

    output.uncompleteTask = function () {
      if (!output.isComplete()) return;
      let numToDelete = 1;
      if (isDate(output.completedDate())) numToDelete++;
      tokens.splice(0, numToDelete);
    };

    /* Added by Prasanna Venkatesh <vipranarayan14@gmail.com>*/
    output.setPriority = function (priority) {
      const rePriorityChar = /^[A-Z]$/;

      if (!priority || !rePriorityChar.test(priority)) return;

      const shouldInsertAtIndex = output.priority() === null;

      let targetIndex = 0;

      if (output.completedDate()) targetIndex++;
      if (output.isComplete()) targetIndex++;

      tokens.splice(targetIndex, shouldInsertAtIndex ? 0 : 1, `(${priority})`);
    };

    output.removePriority = function () {
      if (!output.priority()) return;

      let targetIndex = 0;

      if (output.completedDate()) targetIndex++;
      if (output.isComplete()) targetIndex++;

      tokens.splice(targetIndex, 1);
    };

    output.setCreatedDate = function (dt) {
      if (!isDate(dt)) dt = new Date();
      dt = stripTime(dt);
      let targetIndex = 0;
      let shouldInsertAtIndex = output.createdDate() === null;
      if (output.priority()) targetIndex++;
      if (output.completedDate()) targetIndex++;
      if (output.isComplete()) targetIndex++;
      tokens.splice(targetIndex, shouldInsertAtIndex ? 0 : 1, toIsoDate(dt));
    };

    output.addContext = function (ctxt) {
      if (typeof ctxt !== 'string' || /^\s*$/.test(ctxt))
        throw new Error('Invalid context: ' + ctxt);
      if (ctxt[0] !== '@') ctxt = '@' + ctxt;
      let ctxts = output.contexts();
      for (let i = 0; i < ctxts.length; i++) {
        if (ctxts[i] === ctxt) return;
      }
      tokens.push(ctxt);
    };

    output.addProject = function (prj) {
      if (typeof prj !== 'string' || /^\s*$/.test(prj))
        throw new Error('Invalid project: ' + prj);
      if (prj[0] !== '+') prj = '+' + prj;
      let projects = output.projects();
      for (let i = 0; i < projects.length; i++) {
        if (projects[i] === prj) return;
      }
      tokens.push(prj);
    };

    output.removeContext = function (ctxt) {
      if (typeof ctxt !== 'string' || /^\s*$/.test(ctxt))
        throw new Error('Invalid context: ' + ctxt);
      if (ctxt[0] !== '@') ctxt = '@' + ctxt;
      removeTokens(ctxt);
    };

    output.removeProject = function (prj) {
      if (typeof prj !== 'string' || /^\s*$/.test(prj))
        throw new Error('Invalid project: ' + prj);
      if (prj[0] !== '+') prj = '+' + prj;
      removeTokens(prj);
    };

    output.setAddOn = function (key, value) {
      let i;
      if (
        typeof key !== 'string' ||
        /^\s*$/.test(key) ||
        ['@', '+'].indexOf(key[0]) > -1
      ) {
        throw new Error('Invalid addon name: ' + key);
      }
      if (isDate(value)) value = toIsoDate(value);
      else value = value.toString();
      let targetIndex = null;
      let indicesToRemove = getMatchingIndices(tokens, function (token) {
        return token.substr(0, key.length + 1) === key + ':';
      });
      if (indicesToRemove.length > 0) {
        targetIndex = indicesToRemove[0];
        indicesToRemove.splice(0, 1);
      }
      indicesToRemove.reverse();
      for (i = 0; i < indicesToRemove.length; i++) {
        tokens.splice(indicesToRemove[i], 1);
      }
      let addon = key + ':' + value;
      if (targetIndex === null) tokens.push(addon);
      else tokens.splice(targetIndex, 1, addon);
    };

    output.removeAddOn = function (key) {
      if (
        typeof key !== 'string' ||
        /^\s*$/.test(key) ||
        ['@', '+'].indexOf(key[0]) > -1
      ) {
        throw new Error('Invalid addon name: ' + key);
      }
      removeTokens(function (token) {
        return token.substr(0, key.length + 1) === key + ':';
      });
    };

    let getMatchingIndices = function (arr, test) {
      if (typeof test !== 'function') {
        let compareVal = test.toString();
        test = function (token) {
          return token === compareVal;
        };
      }
      let matches = [];
      for (let i = 0; i < arr.length; i++) {
        if (test(arr[i])) matches.push(i);
      }
      return matches;
    };

    let removeTokens = function (test) {
      let indicesToRemove = getMatchingIndices(tokens, test);
      indicesToRemove.reverse();
      for (let i = 0; i < indicesToRemove.length; i++) {
        tokens.splice(indicesToRemove[i], 1);
      }
    };

    let tokenToDate = function (token) {
      let bits = token.split('-');
      if (bits.length !== 3) return null;
      let year = bits[0],
        month = bits[1],
        day = bits[2];

      let regexTest =
        reFourDigits.test(year) &&
        reTwoDigits.test(month) &&
        reTwoDigits.test(day);
      if (!regexTest) return null;

      let dtStr = bits.join('/'); // Slashes ensure local time is used, per http://blog.dygraphs.com/2012/03/javascript-and-dates-what-mess.html
      let dt = new Date(dtStr);
      if (dt.toString() === 'Invalid Date') return null;
      // Now make sure that javascript didn't interpret an invalid date as a date (e.g. 2014-02-30 can be reimagined as 2014-03-02)
      year = parseInt(year, 10);
      month = parseInt(month, 10);
      day = parseInt(day, 10);
      if (dt.getFullYear() !== year) return null;
      if (dt.getMonth() !== month - 1) return null;
      if (dt.getDate() !== day) return null;
      // Hooray, a valid date!
      return dt;
    };

    return output;
  };

  let toIsoDate = function (dt) {
    if (!isDate(dt)) dt = new Date();
    let zeropad = function (num, len) {
      let output = num.toString();
      while (output.length < len) output = '0' + output;
      return output;
    };
    return (
      dt.getFullYear() +
      '-' +
      zeropad(dt.getMonth() + 1, 2) +
      '-' +
      zeropad(dt.getDate(), 2)
    );
  };

  let isArray = function (arg) {
    return Array.isArray
      ? Array.isArray(arg)
      : Object.prototype.toString.call(arg) === '[object Array]';
  };

  let isDate = function (value) {
    return (
      (value &&
        typeof value === 'object' &&
        toString.call(value) === '[object Date]') ||
      false
    );
  };

  let isSameCalendarDate = function (dt1, dt2) {
    return (
      dt1.getFullYear() === dt2.getFullYear() &&
      dt1.getMonth() === dt2.getMonth() &&
      dt1.getDate() === dt2.getDate()
    );
  };

  let stripTime = function (dt) {
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  };

  let keys = function (obj, typeName) {
    let arr = [];
    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
        if (!typeName || typeof obj[k] === typeName) arr.push(k);
      }
    }
    return arr;
  };

  let publicMethods = {
    SORT_ASC: SORT_ASC,
    SORT_DESC: SORT_DESC,
    parseFile: parseFile,
    create: create,
    parseLine: function (line) {
      return parseLineInternal(line, 0);
    },
  };

  return publicMethods;
})();
