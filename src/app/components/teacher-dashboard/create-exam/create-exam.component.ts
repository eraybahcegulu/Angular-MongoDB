import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../../../services/exam.service';
import { HandlerCreateExamService } from '../../../services/handlers/exam/createExamHandler.service';
import { HandlerDeleteExamService } from '../../../services/handlers/exam/deleteExamHandler.service';
@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  createExamForm: FormGroup;

  createExamMessage: string = '';
  createExamMessageType: string = '';

  deleteExamMessage: string = '';
  deleteExamMessageType: string = '';

  exams: any[] = [];

  constructor(
    private examService: ExamService,
    private formBuilder: FormBuilder,
    private handlerCreateExamService: HandlerCreateExamService,
    private handlerDeleteExamService: HandlerDeleteExamService
  ) {

    this.createExamForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3),]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      type: ['', [Validators.required]],
      questionType: ['', [Validators.required]],
      numberOfQuestions: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
    });
  }
  get formControls() {
    return this.createExamForm.controls;
  }

  
  getExams() {
    this.examService.getExams().subscribe((exams: any[]) => {
      this.exams = exams;
    });
  }

  ngOnInit(): void {
    this.getExams()
  }

  createExam(){
    if (this.createExamForm.invalid) {
      return;
    }

    const examData = {
      name: this.createExamForm.controls['name'].value,
      date: this.createExamForm.controls['date'].value,
      time: this.createExamForm.controls['time'].value,
      type: this.createExamForm.controls['type'].value,
      questionType: this.createExamForm.controls['questionType'].value,
      numberOfQuestions: this.createExamForm.controls['numberOfQuestions'].value,
      duration: this.createExamForm.controls['duration'].value,
    };

    this.examService.createExam(examData).subscribe(
      (response) => {
        const createExamResponse = this.handlerCreateExamService.handleCreateExamResponse(response);
        this.createExamMessage = createExamResponse.message;
        this.createExamMessageType = createExamResponse.type;
        setTimeout(() => {
          this.createExamMessage = '';
          this.createExamMessageType = '';
        }, 3000);
        this.createExamForm.reset();
        this.getExams();
      },
      (error) => {
        const createExamError = this.handlerCreateExamService.handleCreateExamError(error);
        this.createExamMessage = createExamError.message;
        this.createExamMessageType = createExamError.type;
        setTimeout(() => {
          this.createExamMessage = '';
          this.createExamMessageType = '';
        }, 3000);

      }
      
    );

  }

  editErrors(inputs: any): boolean {
    if (inputs.value.trim().length < 3 ) {
      return true;
    }
    return false;
  }

  deleteExam(examId:any)
  {
    this.examService.deleteExam(examId).subscribe(
      () => {
        this.getExams()
        
      },
      (error) => {
        this.getExams()
        const deleteExamError = this.handlerDeleteExamService.handleDeleteExamError(error);
        this.deleteExamMessage = deleteExamError.message;
        this.deleteExamMessageType = deleteExamError.type;
        setTimeout(() => {
          this.deleteExamMessage = '';
          this.deleteExamMessageType = '';
        }, 3000);

      }
    )
  }
}
