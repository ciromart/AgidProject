import { Component, OnInit } from '@angular/core';
import { Survey, SurveyModel, SurveyNG, SurveyWindowNG, StylesManager } from '../assets/surveyjs/packages/survey-angular/survey.angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rationalproject';
  survey: any;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {

    var surveyJSON ={
      "locale": "it",
      "focusFirstQuestionAutomatic": false,
      "pages": [
       {
        "name": "Pagina 1 ",
        "elements": [
         {
          "type": "text",
          "name": "question1",
          "title": {
           "it": "Nome Prova",
           "en": "Name text"
          },
          "isRequired": true,
          "placeHolder": {
           "it": "Inserisci Nome"
          }
         },
         {
          "type": "text",
          "name": "question2",
          "title": {
           "it": "Data Nascita"
          },
          "isRequired": true,
          "inputType": "date"
         },
         {
          "type": "checkbox",
          "name": "question3",
          "title": {
           "it": "Scegli una risposta: "
          },
          "isRequired": true,
          "choices": [
           {
            "value": "item1",
            "text": {
             "it": "Angular 2+"
            }
           },
           {
            "value": "item2",
            "text": {
             "it": "ReactJs"
            }
           },
           {
            "value": "item3",
            "text": {
             "it": "JavaScript"
            }
           }
          ],
          "choicesOrder": "asc"
         },
         {
          "type": "boolean",
          "name": "question4",
          "title": {
           "it": "Laureato?"
          }
         },
         {
          "type": "file",
          "name": "question5",
          "title": {
           "it": "Inserisci Carta D'Identità"
          },
          "isRequired": true,
          "showPreview": false,
          "storeDataAsText": false,
          "maxSize": 0
         },
         {
          "type": "radiogroup",
          "name": "question6",
          "title": {
           "it": "Scegli ambiente"
          },
          "isRequired": true,
          "choices": [
           {
            "value": "item1",
            "text": {
             "it": "Spring Boot"
            }
           },
           {
            "value": "item2",
            "text": {
             "it": "Eclipse"
            }
           }
          ],
          "choicesOrder": "random"
         }
        ],
        "title": "Sezione1",
        "questionsOrder": "initial"
       },
       {
        "name": "Pagina 2",
        "elements": [
         {
          "type": "text",
          "name": "question7",
          "title": {
           "it": "Inserisci email"
          },
          "isRequired": true,
          "validators": [
           {
            "type": "email"
           }
          ],
          "inputType": "email",
          "placeHolder": {
           "it": "Email"
          }
         },
         {
          "type": "text",
          "name": "question8",
          "title": {
           "it": "Inserisci Password"
          }
         },
         {
          "type": "text",
          "name": "question9",
          "title": {
           "it": "Conferma Password"
          }
         },
         {
          "type": "dropdown",
          "name": "question10",
          "title": {
           "it": "Età"
          },
          "choices": [
           {
            "value": "item1",
            "text": {
             "it": "Minore 18"
            }
           },
           {
            "value": "item2",
            "text": {
             "it": "Over 30"
            }
           },
           {
            "value": "item3",
            "text": {
             "it": "Over 60"
            }
           }
          ]
         }
        ]
       }
      ],
      "triggers": [
       {
        "type": "complete"
       }
      ],
      "sendResultOnPageNext": true,
      "showPageNumbers": true,
      "clearInvisibleValues": "none",
      "pagePrevText": {
       "it": "indietro"
      },
      "pageNextText": {
       "it": "avanti"
      },
      "completeText": {
       "it": "finisci"
      }
     };
    StylesManager.applyTheme("winterstone");
    this.survey = new Survey(surveyJSON);
    //survey.onComplete.add(sendDataToServer);
    SurveyNG.render("surveyElement", { model: this.survey });
  }
  switchLanguage(language: string) {
    this.survey.locale = language;
    this.survey.render();
    this.translate.use(language).subscribe(resp =>{
      console.log('resp', resp);
    });
}
}
