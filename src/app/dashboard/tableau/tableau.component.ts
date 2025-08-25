import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { TableauService } from './tableau.service';
import { environment } from '../../../environments/environment';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tableau.component.html',
  styleUrls: [],
})
export class TableauComponent implements OnInit {
  url = '_17066700454380/sheet0?:embed=yes&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:toolbar=no';
  iframeUrl: any;

  constructor(
    private tableauService: TableauService,
    protected _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.tableauService.getTableauToken().subscribe((data) => {
      this.iframeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
        `${environment.tableauServer}/${data['token']}/views/${this.url}`
      );
    });
  }
}