import { Comments } from './../shared/comments';
import { Dish } from '../shared/dish';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentsFeedback } from '../shared/comments_';
import { visibility } from '../animations/app.animations';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility()
  ]
})
export class DishdetailComponent implements OnInit {
  [x: string]: any;
  @ViewChild('cform', { static: true }) commentFormDirective;
  dish: Dish;
  dishcopy: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  author: string;
  rating: number;
  errMess: string;
  comment: Comments;
  commentForm: FormGroup;
  feedback: CommentsFeedback;
  visibility = 'shown';
  formErrors = {
    // tslint:disable-next-line: object-literal-key-quotes
    'author': '',
    // tslint:disable-next-line: object-literal-key-quotes
    'comment': ''
  };
  validationMessages = {
    // tslint:disable-next-line: object-literal-key-quotes
    'author': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required':      'author Name is required.',
      // tslint:disable-next-line: object-literal-key-quotes
      'minlength':     'author Name must be at least 2 characters long.',
      // tslint:disable-next-line: object-literal-key-quotes
      'maxlength':     'author Name cannot be more than 25 characters long.'
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'comment': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required':      'Comment is required.',
    }
  };
  currentDate = new Date().toISOString();
  constructor(private dishservice: DishService, private route: ActivatedRoute ,
     // tslint:disable-next-line: align
     private location: Location, private fb: FormBuilder, @Inject('BaseURL') private BaseURL) {
    this.createForm();
   }
   createForm() {
    this.commentForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: 5,
      message: ['', [Validators.required, Validators.minLength(2)] ]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
   }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishservice.getDish(params[' id ']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    errmess => this.errMess = <any> errmess);
  }
  goBack(): void {
    this.location.back();
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any> errmess; });
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      message: ''
    });
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
