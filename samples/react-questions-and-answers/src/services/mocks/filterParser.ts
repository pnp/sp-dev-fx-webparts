// The code below was initiated using code from the link below and then customized
// https://github.com/jadrake75/odata-filter-parser/blob/master/src/odata-parser.js
// For testing the regex https://www.regexpal.com/
export class FilterParser {

    public static Operators = {
        EQUALS: 'eq',
        AND: 'and',
        OR: 'or',
        GREATER_THAN: 'gt',
        GREATER_THAN_EQUAL: 'ge',
        LESS_THAN: 'lt',
        LESS_THAN_EQUAL: 'le',
        LIKE: 'like',
        IS_NULL: 'is null',
        NOT_EQUAL: 'ne',
        SUBSTRINGOF: 'substringof'
    };

    /*
    Examples documented when we know that we are using them.  Any Regex items defined below without an example may not be explicitly tested
     lookupop - Lookup/ID eq 1
     op - ID eq 1
    */
    private REGEX = {
        parenthesis: /^([(](.*)[)])$/,
        andor: /^(.*?) (or|and)+ (.*)$/,
        lookupop: /(\w*\/\w*) (eq|gt|lt|ge|le|ne) (datetimeoffset'(.*)'|'(.*)'|[0-9]*)/,
        op: /(\w*) (eq|gt|lt|ge|le|ne) (datetimeoffset'(.*)'|'(.*)'|[0-9]*)/,
        startsWith: /^startswith[(](.*),'(.*)'[)]/,
        endsWith: /^endswith[(](.*),'(.*)'[)]/,
        contains: /^contains[(](.*),'(.*)'[)]/,
        substringof: /^substringof[(](.*),(.*)[)]/
    };

    public parse(filterString: string): any {
        // LoggingService.getLogger(this.constructor.name).info(`parse - filter=[${filterString}]`);

        if (!filterString || filterString === '') {
            return null;
        }
        let filter = filterString.trim();
        let obj = {};
        if (filter.length > 0) {
            obj = this.parseFragment(filter);
        }
        return obj;
    }

    private parseFragment(filter): any {
        // LoggingService.getLogger(this.constructor.name).info(`parseFragment - filter=[${filter}]`);

        let found: boolean = false;
        let obj: Predicate = new Predicate();
        // tslint:disable-next-line:forin
        for (let key in this.REGEX) {
            let regex = this.REGEX[key];
            if (found) {
                break;
            }
            let match = filter.match(regex);
            if (match) {
                switch (regex) {
                    case this.REGEX.parenthesis:
                        if (match.length > 2) {
                            if (match[2].indexOf(')') < match[2].indexOf('(')) {
                                continue;
                            }
                            obj = this.parseFragment(match[2]);
                        }
                        break;
                    case this.REGEX.andor:
                        obj = {
                            property: this.parseFragment(match[1]),
                            operator: match[2],
                            value: this.parseFragment(match[3])
                        };
                        break;
                    case this.REGEX.lookupop:
                    case this.REGEX.op:
                        let property = match[1].split('/');
                        obj = {
                            property: property,
                            operator: match[2],
                            value: (match[3].indexOf('\'') === -1) ? +match[3] : match[3]
                        };
                        if (typeof obj.value === 'string') {
                            let quoted = obj.value.match(/^'(.*)'$/);
                            let m = obj.value.match(/^datetimeoffset'(.*)'$/);
                            if (quoted && quoted.length > 1) {
                                obj.value = quoted[1];
                            } else if (m && m.length > 1) {
                                obj.value = new Date(m[1]).toISOString();
                            }
                        }
                        break;
                    case this.REGEX.startsWith:
                    case this.REGEX.endsWith:
                    case this.REGEX.contains:
                        obj = this.buildLike(match, key);
                        break;
                    case this.REGEX.substringof:
                        obj = this.buildSubstringof(match, key);
                        break;
                }
                found = true;
            }
        }
        return obj;
    }

    private buildSubstringof(match, key): Predicate {
        return {
            property: match[2].trim().split('/'),
            operator: FilterParser.Operators.SUBSTRINGOF,
            value: match[1].trim().split(`'`).join('')
        };
    }

    private buildLike(match, key): Predicate {
        let right = (key === 'startsWith') ? match[2] + '*' : (key === 'endsWith') ? '*' + match[2] : '*' + match[2] + '*';
        return {
            property: match[1],
            operator: FilterParser.Operators.LIKE,
            value: right
        };
    }
}

export class Predicate {
    public property: string[] = [];
    public operator: string;
    public value: string;
}
