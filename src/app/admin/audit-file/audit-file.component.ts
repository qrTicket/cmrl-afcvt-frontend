import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
@Component({
    selector: "app-audit-file",
    templateUrl: "./audit-file.component.html",
    styleUrls: ["./audit-file.component.scss"],
})
export class AuditFileComponent implements OnInit {
    auditForm: UntypedFormGroup;
    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit() {
        this.auditForm = this.fb.group({
            fileName: [""],
            timeInterval: [""],
        });
    }

    onSubmit() {
        console.log(this.auditForm.value); 
    }
}
