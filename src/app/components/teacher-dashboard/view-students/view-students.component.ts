import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { HandlerDeleteStudentService } from '../../../services/handlers/deleteStudentHandler.service';
import { HandlerUpdateStudentService } from '../../../services/handlers/updateStudentHandler.service';
const FILTER_PAG_REGEX = /[^0-9]/g;
declare var $: any;
@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {

  students: any[] = [];
  filteredStudents: any[] = [];
  page = 1;
  pageSize = 5;
  selectedStudentId: any;
  selectedStudentNo: any;
  selectedStudentEmail: any;
  selectedStudentName: any;
  selectedStudentSurname: any;

  deleteStudentMessage: string = '';
  deleteStudentMessageType: string = '';

  updateStudentMessage: string = '';
  updateStudentMessageType: string = '';

  searchText: string = '';

  constructor(
    private studentService: StudentService,
    private handlerDeleteStudentService: HandlerDeleteStudentService,
    private handlerUpdateStudentService: HandlerUpdateStudentService
  ) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((students: any[]) => {
      this.students = students;

    });
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
            student.email.toLowerCase().includes(term) ||
            student.no.toString().toLowerCase().includes(term)
          );
        });
      });
    } else {
      this.filteredStudents = this.students;
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
  
  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }


  setSelectedStudent(studentId: string, studentNo: number, studentEmail: string, studentName: string, studentSurname: string) {
    this.selectedStudentId = studentId;
    this.selectedStudentNo = studentNo;
    this.selectedStudentEmail = studentEmail;
    this.selectedStudentName = studentName;
    this.selectedStudentSurname = studentSurname;
  }

  confirmDelete(selectedStudentId: string) {
    this.studentService.getStudents().subscribe((students: any[]) => {
      this.students = students;
      this.selectedStudentId = this.students.find(student => student._id === selectedStudentId);
      this.studentService.deleteStudent(selectedStudentId).subscribe(
        (response) => {
          const deleteStudentResponse = this.handlerDeleteStudentService.handleDeleteStudentResponse(response);
          this.deleteStudentMessage = deleteStudentResponse.message;
          this.deleteStudentMessageType = deleteStudentResponse.type;
          setTimeout(() => {
            this.deleteStudentMessage = '';
            this.deleteStudentMessageType = '';
          }, 3000);
        },
        (error) => {
          const deleteStudentError = this.handlerDeleteStudentService.handleDeleteStudentError(error);
          this.deleteStudentMessage = deleteStudentError.message;
          this.deleteStudentMessageType = deleteStudentError.type;
          setTimeout(() => {
            this.deleteStudentMessage = '';
            this.deleteStudentMessageType = '';
          }, 3000);
        },
        () => {
          $('#deleteStudentModal').modal('hide');
          this.studentService.getStudents().subscribe((students: any[]) => {
            this.students = students;
          });
        });
      $('#deleteStudentModal').modal('hide');
    });
  }


  editErrors(student: any): boolean {
    if (student.email.trim().length < 1 || student.password.trim().length < 1 || student.name.trim().length < 1 || student.surname.trim().length < 1 || student.no === null || student.midterm > 100 || student.final > 100 || student.absenteeism > 100) {
      return true;
    }
    return false;
  }

  startEditing(student: any) {
    student.isEditing = true;
  }

  saveEditedStudent(student: any) {
    
      student.isEditing = false;

      const updatedStudentData = {
        no: student.no,
        email: student.email,
        password: student.password,
        name: student.name,
        surname: student.surname,
        midterm: student.midterm,
        final: student.final,
        absenteeism: student.absenteeism
      };

      this.studentService.updateStudent(student._id, updatedStudentData).subscribe(
        (response) => {
          const updateStudentResponse = this.handlerUpdateStudentService.handleUpdateStudentResponse(response);
          this.updateStudentMessage = updateStudentResponse.message;
          this.updateStudentMessageType = updateStudentResponse.type;
          setTimeout(() => {
            this.updateStudentMessage = '';
            this.updateStudentMessageType = '';
          }, 4000);
        },
        (error) => {
          this.searchText = '';
          this.page = 1;
          const updateStudentError = this.handlerUpdateStudentService.handleUpdateStudentError(error);
          this.updateStudentMessage = updateStudentError.message;
          this.updateStudentMessageType = updateStudentError.type;
          setTimeout(() => {
            this.updateStudentMessage = '';
            this.updateStudentMessageType = '';

          }, 4000);
          this.studentService.getStudents().subscribe((students: any[]) => {
            if(this.filteredStudents)
            {
              this.filteredStudents=students;
            }
            if(this.students){
              this.students = students;
            }
          });
        },
      );  
  }
}