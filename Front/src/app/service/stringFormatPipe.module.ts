import { NgModule } from "@angular/core";
import { StringFormatPipe } from "./stringFormat.pipe";

@NgModule({
    declarations: [
        StringFormatPipe
    ],
    exports: [
        StringFormatPipe
    ]
})
export class StringFormatPipeModule {}
