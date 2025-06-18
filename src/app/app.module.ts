import { AutofocusDirective } from './shared/directives/autofocus.directive';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskItemComponent } from './tasks/task-item/task-item.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDeleteDialogComponent } from './tasks/task-delete-dialog/task-delete-dialog.component';
import { TaskMockService } from './tasks/task.mock.service';
import { TaskService } from './tasks/task.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskFormComponent,
    TaskItemComponent,
    AutofocusDirective,
    TaskDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    NoopAnimationsModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [
    provideHttpClient(),
    {
      provide: TaskService,
      useClass: environment.useMock
        ? TaskMockService
        : TaskService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
