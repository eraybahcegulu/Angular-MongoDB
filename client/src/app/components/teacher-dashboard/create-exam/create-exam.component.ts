import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../../../services/exam.service';
import { StudentService } from '../../../services/student.service';
import { HandlerCreateExamService } from '../../../services/handlers/exam/createExamHandler.service';
import { HandlerDeleteExamService } from '../../../services/handlers/exam/deleteExamHandler.service';
import { HandlerRegisterStudentToExamService } from '../../../services/handlers/exam/registerStudentToExamHandler.service';
import { HandlerUpdateStudentScoreService } from '../../../services/handlers/exam/updateStudentScore.service';
const FILTER_PAG_REGEX = /[^0-9]/g;
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

  registerStudentToExamMessage: string = '';
  registerStudentToExamMessageType: string = '';

  updateStudentScoreMessage: string = '';
  updateStudentScoreMessageType: string = '';

  exams: any[] = [];
  students: any[] = [];

  selectedExamId: any;
  selectedExamName: any;
  selectedExamDate: any;
  selectedExamTime: any;
  selectedExamType: any;
  selectedExamNumberOfQuestions: any;
  selectedExamQuestionType: any;
  selectedExamDuration: any;
  selectedExamRegisteredStudents: any[] = [];

  searchText: string = '';
  page = 1;
  pageSize = 5;
  filteredStudents: any[] = [];

  constructor(
    private examService: ExamService,
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private handlerCreateExamService: HandlerCreateExamService,
    private handlerDeleteExamService: HandlerDeleteExamService,
    private handlerRegisterStudentToExamService: HandlerRegisterStudentToExamService,
    private handlerUpdateStudentScoreService: HandlerUpdateStudentScoreService,
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

  getStudents() {
    this.studentService.getStudents().subscribe((students: any[]) => {
      this.students = students;
    });
  }


  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  selectPage(page: string) {
    const newPage = parseInt(page, 10) || 1;
    const totalPages = this.getTotalPages();
    if (newPage >= 1 && newPage <= totalPages) {
      this.page = newPage;
    } else if (newPage > totalPages) {
      this.page = totalPages;
    } else {
      this.page = 1;
    }
  }

  getStudentsOnCurrentPage() {
    if (this.searchText) {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredStudents.slice(startIndex, endIndex);
    } else {

      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.students.slice(startIndex, endIndex);
    }

  }

  getTotalPages(): number {
    if (this.searchText) {
      const totalFilteredStudents = this.filteredStudents.length;
      return Math.ceil(totalFilteredStudents / this.pageSize);
    } else {
      const totalStudents = this.students.length;
      return Math.ceil(totalStudents / this.pageSize);
    }
  }

  searchStudents(): void {
    if (this.searchText) {
      this.page = 1;
      const searchTerms = this.searchText.toLowerCase().split(" ");
      this.studentService.getStudents().subscribe((students: any[]) => {
        this.students = students;
        this.filteredStudents = this.students.filter(student => {
          return searchTerms.every(term =>
            student.name.toLowerCase().includes(term) ||
            student.surname.toLowerCase().includes(term) ||
            student.no.toString().toLowerCase().includes(term)
          );
        });
      });
    } else {
      this.filteredStudents = this.students;
    }
  }

  setSelectedExam(examId: string, examName: string, examDate: object, examTime: object, examType: string, examQuestionType: string, examNumberOfQuestions: string, examDuration: number, examRegisteredStudents: any[]) {
    this.selectedExamId = examId;
    this.selectedExamName = examName;
    this.selectedExamDate = examDate;
    this.selectedExamTime = examTime;
    this.selectedExamType = examType;
    this.selectedExamNumberOfQuestions = examNumberOfQuestions;
    this.selectedExamQuestionType = examQuestionType;
    this.selectedExamDuration = examDuration;
    this.selectedExamRegisteredStudents = examRegisteredStudents;
    this.getExams();
    this.getStudentsForSelectedExam();
    this.page = 1;
  }

  createExam() {
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
    if (inputs.value.trim().length < 3) {
      return true;
    }
    return false;
  }

  deleteExam(examId: any) {
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

  getStudentsForSelectedExam() {
    if (this.selectedExamId) {
      this.examService.getStudentsForSelectedExam(this.selectedExamId).subscribe((selectedExamRegisteredStudents: any[]) => {
        this.selectedExamRegisteredStudents = selectedExamRegisteredStudents;
      });
    }
  }

  registerStudentForExam(examId: string, studentNo: number) {
    const studentNoData = {
      studentNo: studentNo
    };
    this.examService.registerStudentToExam(examId, studentNoData).subscribe(
      (response) => {
        this.getStudentsForSelectedExam();
        const registerStudentToExamResponse = this.handlerRegisterStudentToExamService.handleRegisterStudentToExamResponse(response);
        this.registerStudentToExamMessage = registerStudentToExamResponse.message;
        this.registerStudentToExamMessageType = registerStudentToExamResponse.type;
        setTimeout(() => {
          this.registerStudentToExamMessage = '';
          this.registerStudentToExamMessageType = '';
        }, 3000);
      },
      (error) => {
        const registerStudentToExamError = this.handlerRegisterStudentToExamService.handleRegisterStudentToExamError(error);
        this.registerStudentToExamMessage = registerStudentToExamError.message;
        this.registerStudentToExamMessageType = registerStudentToExamError.type;
        setTimeout(() => {
          this.registerStudentToExamMessage = '';
          this.registerStudentToExamMessageType = '';
        }, 3000);
      }
    )
  }

  isStudentRegistered(studentNo: number): boolean {
    return this.selectedExamRegisteredStudents.some(student => student.no === studentNo);
  }


  removeRegisteredStudent(selectedExamId: string, studentNo: number) {
    this.examService.removeRegisteredStudent(selectedExamId, studentNo).subscribe(
      () => {
        this.getStudentsForSelectedExam()
      }
    )
  }
  startEditing(registeredStudent: any) {
    registeredStudent.isEditing = true;
  }

  editErrorsScore(registeredStudent: any): boolean {
    if (registeredStudent.score > 100 || registeredStudent.score < 0) {
      return true;
    }
    return false;
  }

  saveEditedRegisteredStudent(registeredStudent: any) {

    registeredStudent.isEditing = false;
    const updatedScoreData = {
      score: registeredStudent.score,
    };

    this.examService.updateStudentScore(this.selectedExamId, registeredStudent._id, updatedScoreData).subscribe(
      (response) => {
        this.getExams();
      },
      (error) => {
        const updateStudentScoreError = this.handlerUpdateStudentScoreService.handleUpdateStudentScoreError(error);
        this.updateStudentScoreMessage = updateStudentScoreError.message;
        this.updateStudentScoreMessageType = updateStudentScoreError.type;
        setTimeout(() => {
          this.updateStudentScoreMessage = '';
          this.updateStudentScoreMessageType = '';
          location.reload();
        }, 3000);
        this.getExams();
        this.getStudentsForSelectedExam();
      }
    );
  }
}