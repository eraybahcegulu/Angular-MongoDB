import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';
const FILTER_PAG_REGEX = /[^0-9]/g;
declare var $: any;
@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {

  students: any[] = [];
  page = 1;
  pageSize = 5;
  selectedStudent: any;
  
  constructor(private studentService: StudentService, ) {  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((students: any[]) => {
      this.students = students;

    });
  }

  getStudentsOnCurrentPage() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.students.slice(startIndex, endIndex);
  }
	selectPage(page: string) {
		this.page = parseInt(page, 10) || 1;
	}

  formatInput(input: HTMLInputElement) {
		input.value = input.value.replace(FILTER_PAG_REGEX, '');
	}


  setSelectedStudent(studentId: string) {
    this.selectedStudent = studentId;
  }
  
  confirmDelete(selectedStudent: string) {
    this.selectedStudent = this.students.find(student => student._id === selectedStudent);
    this.studentService.deleteStudent( selectedStudent).subscribe(() => {
      $('#deleteStudentModal').modal('hide');
            this.studentService.getStudents().subscribe((students: any[]) => {
        this.students = students;
      });
    });
  }
}