// ----------------------- SEEDING USER MODEL

// function writeUserData(userId, name, email) {
//     firebase.database().ref('users/' + userId).set({
//       displayName: name,
//       email: email
//     });
//   }

//   writeUserData('syun', 'Stella Yun', 'stella@email.com')
//   writeUserData('jdavis', 'Jordan Davis', 'jordan@email.com')

// ----------------------- SEEDING PROJECT MODEL

function writeProjectData(projectId, name, member) {
  //   let members = {};
  //   member.forEach(m => {
  //     members[m] = true;
  //   });
  firebase
    .database()
    .ref("projects/" + projectId)
    .set({
      name: name,
      members: members,
      events: events,
      todo: todo
    });
}

writeProjectData(
  "capstone",
  "Capstone",
  ["syun", "jdavis"],
  [
    {
      codeReview: {
        day: 2,
        month: 10,
        year: 2018,
        timestamp: 1538512200000,
        dateString: "2018-10-02"
      },
      testingCal: {
        day: 1,
        month: 10,
        year: 2018,
        timestamp: 1538420772,
        dateString: "2018-10-01"
      }
    }
  ]
);
//writeProjectData("hackathon", "Hackathon", ["jdavis"]);

// ----------------------- SEEDING NOTE MODEL

//   function writeNoteData(noteId, author, content) {
//     firebase.database().ref('notes/' + noteId).set({
//       author: author,
//       content: content
//     })
//   }

//   writeNoteData('note1', 'syun', 'I will complete the database today.')
//   writeNoteData('note2', 'syun', 'Meet group members at Sunday 7PM.')
//   writeNoteData('note3', 'jdavis', 'Zoom meeting at noon.')
