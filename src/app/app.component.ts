import { Component, OnInit } from '@angular/core';
import { Survey, SurveyModel, SurveyNG, SurveyWindowNG, StylesManager } from '../assets/surveyjs/packages/survey-angular/survey.angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rationalproject';

  constructor() { }

  ngOnInit() {

    var surveyJSON = {
      title: "Tell us, what technologies do you use?", pages: [
        {
          name: "page1", questions: [
            { type: "radiogroup", choices: ["Yes", "No"], isRequired: true, name: "frameworkUsing", title: "Do you use any front-end framework like Bootstrap?" },
            { type: "checkbox", choices: ["Bootstrap", "Foundation"], hasOther: true, isRequired: true, name: "framework", title: "What front-end framework do you use?", visibleIf: "{frameworkUsing} = 'Yes'" }
          ]
        },
        {
          name: "page2", questions: [
            { type: "radiogroup", choices: ["Yes", "No"], isRequired: true, name: "mvvmUsing", title: "Do you use any MVVM framework?" },
            { type: "checkbox", choices: ["AngularJS", "KnockoutJS", "React"], hasOther: true, isRequired: true, name: "mvvm", title: "What MVVM framework do you use?", visibleIf: "{mvvmUsing} = 'Yes'" }]
        },
        {
          name: "page3", questions: [
            { type: "comment", name: "about", title: "Please tell us about your main requirements for Survey library" }]
        }
      ]
    };
    StylesManager.applyTheme("default")
    var survey = new Survey(surveyJSON);
    //survey.onComplete.add(sendDataToServer);
    SurveyNG.render("surveyElement", { model: survey });
  }
}
