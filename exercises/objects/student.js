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
    addNote(code, note) {
      if (code in this.notes) {
        this.notes[code].push(note);
      } else {
        this.notes[code] = [note];
      }
    },
    updateNote(code, note) {
      this.notes[code] = [note]
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

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"