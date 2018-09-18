import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { PersonsServiceProxy, PersonDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditPersonModalComponent } from './create-or-edit-person-modal.component';
import { ViewPersonModalComponent } from './view-person-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as moment from 'moment';

@Component({
    templateUrl: './persons.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class PersonsComponent extends AppComponentBase {

    @ViewChild('createOrEditPersonModal') createOrEditPersonModal: CreateOrEditPersonModalComponent;
    @ViewChild('viewPersonModalComponent') viewPersonModal: ViewPersonModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;
	
    advancedFiltersAreShown = false;
	filterText = '';
		nameFilter = '';

	

    constructor(
        injector: Injector,
        private _http: Http,
        private _personsServiceProxy: PersonsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getPersons(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._personsServiceProxy.getAll(
			this.filterText,
			this.nameFilter,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getSkipCount(this.paginator, event),
            this.primengTableHelper.getMaxResultCount(this.paginator, event)
        ).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createPerson(): void {
        this.createOrEditPersonModal.show();
    }

    deletePerson(person: PersonDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._personsServiceProxy.delete(person.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

	exportToExcel(): void {
        this._personsServiceProxy.getPersonsToExcel(
		this.filterText,
			this.nameFilter,
		)
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}