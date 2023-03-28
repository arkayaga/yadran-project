import { TranslateService } from '@ngx-translate/core';

export class DynamicLocaleId extends String {
    constructor(protected service: TranslateService) {
        super('');
    }

    override toString() {
        return this.service.currentLang;
    }
}