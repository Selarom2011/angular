import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetCarForView, CarDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCarModal',
    templateUrl: './view-car-modal.component.html'
})
export class ViewCarModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item : GetCarForView;
	

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCarForView();
        this.item.car = new CarDto();
    }

    show(item: GetCarForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }
    
    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
