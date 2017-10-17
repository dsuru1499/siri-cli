import { Component, ElementRef, Input, OnChanges, SimpleChange } from '@angular/core';

declare var $: any;

@Component({
    selector: 'jsonview',
    templateUrl: 'jsonview.component.html',
    styleUrls: ['jsonview.component.css']
})

export class JsonviewComponent implements OnChanges {

    @Input()
    private model: any;

     @Input()
    private collapsed: boolean;

    constructor(private elementRef: ElementRef) {

    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        this.update(this.model);
    }

    private update(model: any) {
        let el = this.elementRef.nativeElement;
        let options = { collapsed: this.collapsed };
       $(el).JSONView(model, options);
    }
}
