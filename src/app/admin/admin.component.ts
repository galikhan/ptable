import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ApiService} from "./services/api.service";
import {CreateParentDto, Topic} from "./constants/interface";
import {MatDialog} from "@angular/material/dialog";
import {TopicComponent} from "./dialogs/topic/topic.component";
import {ContentComponent} from "./dialogs/content/content.component";
import {CodeComponent} from "./dialogs/code/code.component";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ContentService} from "../service/content.service";
import {Content} from "../interface/content";
import * as ace from 'ace-builds';
import {DeleteConfirmationComponent} from "./dialogs/delete-confirmation/delete-confirmation.component";
import {environment} from "src/environments/environment";
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  addTopicName: string = "";
  parentData!: Topic[];
  childData!: Topic[];
  selectedSubTopic: any;
  selectedParentIndex!: number;
  isDisabledBtn!: boolean;
  routeTopicIndex!: number;
  routeSubtopicId!: number;
  contents: Content[] = [];
  @ViewChild('supEdit') public supedit!: ElementRef<HTMLElement>;
  imageUrlPrefix = environment.domain + '/images';
  currentVideoId!: string;
  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private service: ContentService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }


  logOut() {
    localStorage.clear();
    this.router.navigate(['/informatics'])
  }


}
