import {AfterViewInit, Component, OnInit} from "@angular/core";
import {ApiService} from "./services/api.service";
import {ParentDatum} from "./constants/interface";
import {MatDialog} from "@angular/material/dialog";
import {TopicComponent} from "./dialogs/topic/topic.component";
import {ContentComponent} from "./dialogs/content/content.component";
import {CodeComponent} from "./dialogs/code/code.component";
import {ActivatedRoute, Params, Router} from "@angular/router";

// declare const $: any; // Import Bootstrap's JavaScript functions

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, AfterViewInit {
    addTopicName: string = "";
    parentData!: ParentDatum[];
    childData!: ParentDatum[];
    selectedSubTopic: any;
    selectedParentIndex!: number;
    isDisabledBtn!: boolean;
    selectedRouteTopicId!: number;

    constructor(
        private apiService: ApiService,
        public dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ifRouteHasTopic(parentIndex: number) {
        const topicId = this.selectedRouteTopicId;
        return !!(topicId && (topicId - 1) == parentIndex);
    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.selectedRouteTopicId = +params['topicId'];
        });

        this.getParentTopics();
    }

    addContent() {
        const dialog = this.dialog.open(ContentComponent, {
            width: '50%'
        })
    }

    addCode() {
        const dialog = this.dialog.open(CodeComponent, {
            width: '50%'
        })
    }

    onClickChild(children: any, parentIndex: number) {
        const parentTopic = parentIndex + 1;
        this.router.navigate(['/admin/topic/' + parentTopic + '/subtopic/', children.id])
        this.selectedParentIndex = parentIndex;
        this.selectedSubTopic = children;
    }

    addTopic() {
        const parentDto = {
            name: this.addTopicName,
            parent: 1
        };
        this.apiService.createTopic(parentDto).subscribe(response => {
            console.log(response)
        })
    }

    addSubtopic(parent: ParentDatum) {
        const dialog = this.dialog.open(TopicComponent, {
            data: {
                type: 'child'
            },
            width: '20%'
        })

        dialog.afterClosed().subscribe((subTopicName => {
            if (subTopicName) {
                const childDto = {
                    name: subTopicName,
                    parent: parent.id,
                    isRemoved: false
                }
                this.apiService.createTopic(childDto).subscribe((response: any) => {
                    this.getTopicByParentId(response.parent)
                })
            }
        }))
    }

    getParentTopics() {
        this.apiService.getParentTopics().subscribe(response => {
            this.parentData = response;
            if (this.selectedRouteTopicId) {
                this.selectedParentIndex = this.selectedRouteTopicId - 1;
                const childId = response[this.selectedParentIndex]?.id;
                console.log(childId)
                this.getTopicByParentId(childId);
            }
        })
    }

    getTopicByParentId(parentId: number) {
        this.apiService.getTopicByParentId(parentId).subscribe(children => {
            this.childData = children;
            this.selectedSubTopic = children[this.selectedParentIndex];
        })
    }

    onClickAccordion(parentId: number, index: number) {
        this.getTopicByParentId(parentId);
    }

    deleteTopic(parentItem: ParentDatum) {
        this.isDisabledBtn = true;
        this.apiService.deleteTopic(parentItem).subscribe(response => {
            this.isDisabledBtn = false;
            this.getParentTopics();
        })
    }


    private toggleCollapse(index: number) {
        const itemId = `collapse${index}`;
        const element = document.getElementById(itemId);

        if (element) {
            element.classList.toggle('show');
        }
    }
}
