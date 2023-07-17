import { Component} from '@angular/core';
import {
  TuiTablePaginationOptions,
  tuiTablePaginationOptionsProvider,
} from '@taiga-ui/addon-table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiCurrency} from '@taiga-ui/addon-commerce';
import {TuiDay, TuiTime} from '@taiga-ui/cdk';
import { ChapterService } from '../chapter.service';
import { CreateChapter, Title } from '../models/CreateChapter';
import { SuggetionsChapterContent } from '../models/SuggetionsChapterContent';
const customOptionContent: TuiTablePaginationOptions['sizeOptionContent'] = ({
  $implicit,
  total,
}) => {
  switch ($implicit) {
      case 10:
          return 'Ten';
      case total:
          return 'Show all rows';
      default:
          return $implicit;
  }
};


@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss'],
  providers: [
    tuiTablePaginationOptionsProvider({sizeOptionContent: customOptionContent}),
],
})
export class CreateChapterComponent {
  titles!: SuggetionsChapterContent[];

  /**
   *
   */
  constructor(private chapterService:ChapterService) {


  }
  items = [
    {
        caption: 'Chapters',
        routerLink: '/chapter/list-chapters',
    },
    {
      caption: 'Create Chapter',
      routerLink: '/chapter/create-chapters',
  },


];

createChapterForm = new FormGroup({
  url: new FormControl(``, Validators.required),
  tableContents: new FormControl(``, Validators.required),
  dedication: new FormControl(``, Validators.required),
  preface: new FormControl(``, Validators.required),
  title: new FormControl(``, Validators.required),
  content: new FormControl(``, Validators.required)
});

titeSuggestionsForm = new FormGroup({
  title: new FormControl(``, Validators.required),

});
submitGetChapterContentSuggestion() {
  const  question  = this.titeSuggestionsForm.value.title as string;
  this.chapterService.getTitles(question)
  .subscribe(
    (response: any) => {                           //next() callback
      console.log('response received')
      this.titles = response as SuggetionsChapterContent[];
      console.log(response);
    },
    (error: any) => {                              //error() callback
      alert(JSON.stringify(error));

    },
    () => {                                   //complete() callback
      console.log("complete");      //This is actually not needed

    });
}
submitCreateChapter() {
  const createChapter= new CreateChapter();
  createChapter.title=new Title();
  createChapter.url  = this.createChapterForm.value.url as string;
 createChapter.tableContents  = this.createChapterForm.value.tableContents as string;
 createChapter.dedication  = this.createChapterForm.value.dedication as string;
 createChapter.preface  = this.createChapterForm.value.preface as string;
 createChapter.title.title  = this.createChapterForm.value.title as string;
  this.chapterService.createChapter(createChapter)
  .subscribe(
    (response: any) => {                           //next() callback
      console.log('response received')
     alert(JSON.stringify(response));
      console.log(response);
    },
    (error: any) => {                              //error() callback
      alert(JSON.stringify(error));

    },
    () => {                                   //complete() callback
      console.log("complete");      //This is actually not needed

    });
}
}