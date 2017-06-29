import { HandWritingFormatPage } from './../../e2e/app.po';
import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';

export class HWparams {
  id: string;
  text: string;
  size: string;
  color: string;
}

export class HWfonts {
  id: string;
  title: string;
  date_created: Date;
  date_modified: Date;
  rating_neatness: Number;
  rating_embellishment: Number;
  rating_cursivity: Number;
  rating_character_width: Number;
}

const URL_RENDER = 'https://api.handwriting.io/render/png';
const URL_FONTS = 'https://api.handwriting.io/handwritings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Hand Writing Format';
  f: HWfonts[];
  f_id: string;
  f_size: string;
  f_color: string;
  txt2conv: string;
  imgTxt: string;
  img: HTMLElement;
  private headers: Headers;
  private options: RequestOptions;

  constructor(private http: Http/*, private sanitizer: DomSanitizer*/) { }

  private getAuth() {
    this.headers = new Headers({ 'Authorization': 'Basic ' + btoa('XBD15YWTMPAYBB3Z:A05JT476GDE7P3PJ') });
    this.options = new RequestOptions({ headers: this.headers });
  }

  formatText() {
    if ((this.f_id === '') || (this.txt2conv === '') || (this.  f_size === '') || (this.f_color === '')) {
      return false;
    }

    this.getAuth();

    const finalURL = URL_RENDER + '?handwriting_id=' + this.f_id + '&amp;text=' + this.txt2conv +
        '&amp;handwriting_size=' + this.f_size + 'px&amp;handwriting_color=' + this.f_color.substr(1);

    // this.img = document.getElementById('imgText');
    // (<HTMLImageElement>this.img).src = finalURL;
    this.imgTxt = finalURL;

    /*
    this.http.get(finalURL, this.options)
      .map((res: Response) => res.text())
      .subscribe((data: any) => this.imgTxt = this.sanitizer.bypassSecurityTrustResourceUrl(data),
        error => console.log(error),
        () => console.log('formatText() complete'));
    */
  }

  /*
  setImg(d: any) {
    this.img = document.getElementById('imgText');
    this.imgTxt = d;
  }
  */

  ngOnInit() {
    this.getAuth();

    this.http.get(URL_FONTS, this.options)
      .map((res: Response) => <HWfonts[]>res.json())
      .catch(this.handleError)
      .subscribe((data: HWfonts[]) => this.f = data,
        error => console.log(error),
        () => console.log('Get all fonts complete'));

    // setting default values
    this.f_id = '2D5QW0F80001';
    this.f_color = '#000000';
    this.f_size = '12';
    this.txt2conv = 'This will be converted...';
    this.imgTxt = '';
  }
  private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
