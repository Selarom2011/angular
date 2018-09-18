import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { CarsServiceProxy, CarDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCarModalComponent } from './create-or-edit-car-modal.component';
import { ViewCarModalComponent } from './view-car-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as moment from 'moment';

@Component({
    templateUrl: './cars.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CarsComponent extends AppComponentBase {

    @ViewChild('createOrEditCarModal') createOrEditCarModal: CreateOrEditCarModalComponent;
    @ViewChild('viewCarModalComponent') viewCarModal: ViewCarModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;
	
    advancedFiltersAreShown = false;
	filterText = '';
		nameFilter = '';
		maxStockCountFilter : number;
		maxStockCountFilterEmpty : number;
		minStockCountFilter : number;
		minStockCountFilterEmpty : number;
		maxPriceFilter : number;
		maxPriceFilterEmpty : number;
		minPriceFilter : number;
		minPriceFilterEmpty : number;
		bodyTypeFilter = '';
		maxReleaseDateFilter : moment.Moment;
		minReleaseDateFilter : moment.Moment;
		isAvailableFilter = -1;
		brandNameFilter = '';

	

    constructor(
        injector: Injector,
        private _http: Http,
        private _carsServiceProxy: CarsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getCars(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._carsServiceProxy.getAll(
			this.filterText,
			this.nameFilter,
			this.maxStockCountFilter == null ? this.maxStockCountFilterEmpty: this.maxStockCountFilter,
			this.minStockCountFilter == null ? this.minStockCountFilterEmpty: this.minStockCountFilter,
			this.maxPriceFilter == null ? this.maxPriceFilterEmpty: this.maxPriceFilter,
			this.minPriceFilter == null ? this.minPriceFilterEmpty: this.minPriceFilter,
			this.bodyTypeFilter,
			this.maxReleaseDateFilter,
			this.minReleaseDateFilter,
			this.isAvailableFilter,
			this.brandNameFilter,
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

    createCar(): void {
        this.createOrEditCarModal.show();
    }

    deleteCar(car: CarDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._carsServiceProxy.delete(car.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

	exportToExcel(): void {
        this._carsServiceProxy.getCarsToExcel(
		this.filterText,
			this.nameFilter,
			this.maxStockCountFilter == null ? this.maxStockCountFilterEmpty: this.maxStockCountFilter,
			this.minStockCountFilter == null ? this.minStockCountFilterEmpty: this.minStockCountFilter,
			this.maxPriceFilter == null ? this.maxPriceFilterEmpty: this.maxPriceFilter,
			this.minPriceFilter == null ? this.minPriceFilterEmpty: this.minPriceFilter,
			this.bodyTypeFilter,
			this.maxReleaseDateFilter,
			this.minReleaseDateFilter,
			this.isAvailableFilter,
			this.brandNameFilter,
		)
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}