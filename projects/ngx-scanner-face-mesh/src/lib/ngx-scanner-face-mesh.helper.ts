import { AsyncSubject } from "rxjs";
import { HtmlStyles } from "./ngx-scanner-face-mesh.options";


/**
 * HAS_OWN_PROPERTY
 * Fix issue vs ng v 6-7-8
 * Optional chaining (?.) just have on ng v 9++
 * eg: HAS_OWN_PROPERTY(config, 'frameOptions.style') // output: boolean
 * @param obj 
 * @param propertyPath 
 * @returns 
 */
export const HAS_OWN_PROPERTY = (obj: any, propertyPath: string) => {
    const properties = propertyPath.split(".");
    for (let  i = 0; i < properties.length; i++) {
        let prop = properties[i];
        if (!obj.hasOwnProperty(prop)) {
            return false;
        } else {
            obj = obj[prop];
        }
    }
    return true;
};

/**
 * OVERRIDES
 * @param variableKey 
 * @param config 
 * @param defaultConfig 
 * @returns 
 */
export const OVERRIDES = (variableKey: string, config: HtmlStyles, defaultConfig: HtmlStyles) => {
    if (config && Object.keys(config[variableKey]).length) {
        for (const key in defaultConfig) {
            const cloneDeep = JSON.parse(JSON.stringify({ ...config[variableKey], ...{ [key]: (defaultConfig as any)[key] } }));
            config[variableKey] = config[variableKey].hasOwnProperty(key) ? config[variableKey] : cloneDeep;
        }
        return config[variableKey];
    } else {
        return defaultConfig;
    }
};

/**
 * Rxjs complete
 * @param as
 * @param data
 * @param error
 */
export const AS_COMPLETE = (as: AsyncSubject<any>, data: any, error = null) => {
    error ? as.error(error) : as.next(data);
    as.complete();
}