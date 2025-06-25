import { NgModule } from '@angular/core'

// NG ZORRO IMPORTS


import { NzFormModule } from 'ng-zorro-antd/form';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzInputModule} from 'ng-zorro-antd/input';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {NzSelectModule} from 'ng-zorro-antd/select';
import{NzTimePickerModule} from 'ng-zorro-antd/time-picker';
import{NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import{NzTableModule} from 'ng-zorro-antd/table'

@NgModule({
    exports:[
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzSelectModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzSpinModule,
    NzPaginationModule,
    NzListModule,
    NzTableModule
    

    


    ]
})

export class NgZorroImportsModule{

}