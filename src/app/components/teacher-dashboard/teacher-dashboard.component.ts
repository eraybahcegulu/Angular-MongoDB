import { Component} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
})

export class TeacherDashboardComponent {

  userInfo: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (userInfo: any) => {
        this.userInfo = userInfo;
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }

  addStudent() {
    this.router.navigate(['/add-student']);
  }

  viewStudents(){
    this.router.navigate(['/view-students']);
  }

  createExam(){
    this.router.navigate(['/create-exam']);
  }

}