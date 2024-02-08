import { TestBed } from '@angular/core/testing';

import { AtiveuserService } from './ativeuser.service';

describe('AtiveuserService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AtiveuserService = TestBed.get(AtiveuserService);
        expect(service).toBeTruthy();
    });
});
