/* eslint-disable max-lines-per-function */
function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    notes: {},
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },
    addCourse(course) {
      this.courses.push(course);
    },
    listCourses() {
      return this.courses.slice();
    },
    addGrade(code, grade) {
      let course = this.courses.filter(course => course.code === code)[0];
      course.grade = grade;
    },
    addNote(code, note) {
      if (code in this.notes) {
        this.notes[code].push(note);
      } else {
        this.notes[code] = [note];
      }
    },
    updateNote(code, note) {
      this.notes[code] = [note];
    },
    viewNotes() {
      for (let index = 0; index < this.courses.length; index++) {
        let course = this.courses[index];
        let courseCode = course.code;
        if (!(courseCode in this.notes)) {
          continue;
        }
        let courseName = course.name;
        let combinedNotes = this.notes[courseCode].join('; ');
        console.log(`${courseName}: ${combinedNotes}`);
      }
    }
  };
}

function createSchool() {
  return {
    students: [],
    addStudent(name, year) {
      if (!["1st", "2nd", "3rd", "4th", "5th"].includes(year)) {
        console.log("Invalid year");
      }
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    },
    enrollStudent(student, course) {
      student.addCourse(course);
    },
    addGrade(student, code, grade) {
      student.addGrade(code, grade);
    },
    getReportCard(student) {
      student.listCourses().forEach(course => {
        if (course.grade) {
          console.log(`${course.name}: ${course.grade}`);
        } else {
          console.log(`${course.name}: In progress`);
        }
      });
    },
    courseReport(courseName) {
      let studentsWithCourseGrade = this.students.filter(student =>
        student.listCourses().some(course =>
          course.name === courseName && !!course.grade));

      if (studentsWithCourseGrade.length === 0) {
        console.log(undefined);
        return;
      }

      let grades = [];
      console.log(`=${courseName} Grades=`);
      studentsWithCourseGrade.forEach(student => {
        let course = student.listCourses().filter(
          course => course.name === courseName)[0];
        grades.push(course.grade);
        console.log(`${student.name}: ${course.grade}`);
      });
      console.log('---');
      console.log(`Course Average: ${grades.reduce((prev, curr) => curr + prev) / grades.length}`);
    }
  };
}

let school = createSchool();

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, { name: 'Math', code: 101 });
school.addGrade(foo, 101, 95);
school.enrollStudent(foo, { name: 'Advanced Math', code: 102 });
school.addGrade(foo, 102, 90);
school.enrollStudent(foo, { name: 'Physics', code: 202 });

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, { name: 'Math', code: 101 });
school.addGrade(bar, 101, 91);

let qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, { name: 'Math', code: 101 });
school.addGrade(qux, 101, 93);
school.enrollStudent(qux, { name: 'Advanced Math', code: 102 });
school.addGrade(qux, 102, 90);

school.addGrade(foo, 101, 95);


school.getReportCard(foo);
// Math: 95
// Advanced Math: 90
// Physics: In progress

school.courseReport('Math');
// =Math Grades=
// foo: 95
// bar: 91
// qux: 93
// ---
// Course Average: 93

school.courseReport('Advanced Math');
// =Advanced Math Grades=
// foo: 90
// qux: 90
// ---
// Course Average: 90

school.courseReport('Physics');
// undefined
