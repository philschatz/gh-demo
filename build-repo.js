var Octo = require('octokat');
var octo = new Octo({});
var repo = octo.repos('philschatz/gh-demo');

DEFAULT_MILESTONE_DUE_AT = new Date('2016-01-31');

THE_CODE = 'the-code.md';
TASK_LABELS = ["UX Design", "FE Implement", "BE Implement", "FE Test", "BE Test"];

var CONFIG = [
  // {title: 'CC1.01 - Recruiting Teachers (Promo site, Salesforce)', stories: [
  //   ]
  // },
  // {title: 'CC1.02 - W&N & OS Content Generation', stories: [
  //   ]
  // },
  // {title: 'CC1.03 - Content Preparation and Import ', stories: [
  //   ]
  // },
  // {title: 'CC1.04 - Exercise Editing and Q/A ', stories: [
  //     {title: "[CC1.04.001] REPORT  As an admin or content analyst, when I import a book and the import fails, I want to see in the UI the errors that caused the failure"},
  //     {title: "[CC1.04.002] REPORT As Tutor, add a content analyst role that can be assigned to users."},
  //     {title: "[CC1.04.003] REPORT As Tutor, I need to add an ecosystem comment field and DISPLAY it next to the ecosystem"},
  //     {title: "[CC1.04.004] REPORT As Tutor, I want admin's and content analysts to be able to delete an ecosystem"},
  //     {title: "[CC1.04.005] EXERCISE As a content analyst, I want to see all exercises for a section (cnx-page-module) of the book"},
  //     {title: "[CC1.04.006] EXERCISE As a content analyst, I want to quickly go from a QA view exercise to the editing interface in OX Exercises."},
  //     {title: "[CC1.04.007] EXERCISE As a content analyst, I want to know when an exercise has been changed."},
  //     {title: "[CC1.04.008] EXERCISE As a content analyst, I want to filter the exercises that I’m QA’ing."},
  //     {title: "[CC1.04.009] EXERCISE As a content analyst, I want to see counts for exercises by section, tag, type, etc to help me find incorrectly-tagged exercises."},
  //     {title: "[CC1.04.010] CONTENT As a content analyst, I want to see a QA view of a section of the book."},
  //     {title: "[CC1.04.011] CONTENT As a content analyst, I want to quickly link from a QA view of a section back to the viewing and editing interfaces in CNX."},
  //     {title: "[CC1.04.012] CONTENT As a content analyst, I want to easily change between sections of the book I’m QA’ing."},
  //     {title: "[CC1.04.013] EDIT As DMS I need a way to edit exercises."},
  //     {title: "[CC1.04.014] EDIT  Preview Math and markdown."},
  //     {title: "[CC1.04.015] EDIT As an Exercise editor, I want to Publish my version."},
  //     {title: "[CC1.04.016] EDIT As an Exercise editor, I want to 'Save a draft'"},
  //     {title: "[CC1.04.017] EDIT As an exercise author, I want to create a brand new Exercise."},
  //   ]
  // },
  // {title: 'CC1.05 - CNX Navigation (General, Search, TOC)', stories: [
  //   ]
  // },
  // {title: 'CC1.06 - CC Widget Mechanics / Infrastructure (CNX/Tutor interaction)', stories: [
  //   ]
  // },
  {title: 'CC1.07 - Student Registration, Enrollment, Login, Auth', stories: [
      {title: "[CC1.07.001] Write /api/enroll endpoint - os5.1"},
      {title: "[CC1.07.002] As a student, I can use an instructor provided registration code to register for a class - os5.1"},
      {title: "[CC1.07.003] As a student, I want to know my registration was successful"},
      {title: "[CC1.07.004] Write enrollment components and confirmation messages"},
      {title: "[CC1.07.005] TEST As a student, I want to change period or course"},
      {title: "[CC1.07.006] TEST As a student, I can change course/instructor"},
      {title: "[CC1.07.007]	TEST As a student, I want to change periods in the same course"},
      {title: "[CC1.07.008]	TEST As a student, I’m in multiple CC courses and thus I want to enroll in these additional CC courses"},
      {title: "[CC1.07.009]	When a student comes to a cnx-page-module and is not logged in to Concept Coach, allow them to sign up or login to Concept Coach (widget)"},
      {title: "[CC1.07.010] As a student, I want to see which user I’m logged in as from any view"},
      {title: "[CC1.07.011] Present Privacy Policy & Terms of Service to registering users or to logging in users when terms content has changed"},
      {title: "[CC1.07.012] As a student, I want to edit my OpenStax Account profile"},
      {title: "[CC1.07.013] Timeout policy, Protecting Idle Student Sessions"},
      {title: "[CC1.07.014] As a student, I can use assistive technology to login/register"},
      {title: "[CC1.07.015]	As a Student, I forgot my password and don't want Micaela involved in resetting it for me."},
    ]
  },
  // {title: 'CC1.08 - Students performing assignments ', stories: [
  //   ]
  // },
  // {title: 'CC1.09 - Student Progress Views ', stories: [
  //   ]
  // },
  // {title: 'CC1.10 - Admin / Teacher Course setup   ', stories: [
  //   ]
  // },
  // {title: 'CC1.11 - Teacher Login, Authentication ', stories: [
  //   ]
  // },
  // {title: 'CC1.12 - Delivering Assignments (Concept Coach readings and Non-Concept Coach HW, CNX Numbering)', stories: [
  //   ]
  // },
  // {title: 'CC1.13 - Teacher Views (settings, codes, roster, scores, analytics, data export) ', stories: [
  //   ]
  // },
  // {title: 'CC1.14 - Training & supporting Teacher & Students', stories: [
  //   ]
  // },
  // {title: 'CC1.15 - OS Metrics (Enrollment, Research, Gates)', stories: [
  //   ]
  // },
  // {title: 'CC1.16 - CC Pilots ', stories: [
  //   ]
  // },
]

var SEED = 0;
function rand(max) {
  SEED += 1;
  return Math.round(('0.'+Math.sin(SEED).toString().substr(6)) * (max-1));
}

function btoa(str) {
  var buffer = new Buffer(str, 'binary');
  return buffer.toString('base64');
}
function atob(str) {
  var buffer = new Buffer(str, 'base64');
  return buffer.toString('binary');
}

function timeoutPromise(ms) {
  console.log('waiting ' + ms);
  return new Promise(function(resolve) {
    return setTimeout(function() {
      console.log('done waiting ' + ms);
      resolve();
    }, ms);
  });
}

var SYNC_PROMISE_INDEX = -1;
var SYNC_PROMISES = [];
function inSyncPromise(fn) {
  var p = new Promise(function(resolve, reject) {
    SYNC_PROMISE_INDEX+=1;
    if (SYNC_PROMISES[SYNC_PROMISE_INDEX]) {
      SYNC_PROMISES[SYNC_PROMISE_INDEX].then(function() {
        fn().then(resolve, reject);
      });
    } else {
      SYNC_PROMISES = [];
      SYNC_PROMISE_INDEX = -1;
      fn().then(resolve, reject);
    }
  });
  SYNC_PROMISES.push(p);
  return p.then(function() { });
}


// inSyncPromise(function(){
//   return timeoutPromise(1000).then(function() {
//     console.log('askhfksjhf');
//   });
// });
// inSyncPromise(function(){
//   return timeoutPromise(100).then(function() {
//     console.log('bbbbbbb');
//   });
// });
// inSyncPromise(function(){
//   return timeoutPromise(10).then(function() {
//     console.log('ccccccc');
//   });
// });

function createPullRequest(issue) {
  console.log('enqueueing Creating PR for ' + issue.number);
  return inSyncPromise(function() {
    console.log('starting Create PR for ' + issue.number);
    return repo.git.refs('heads/master').fetch().then(function(ref) {
      console.log('found master. creating branch');
      var sha = ref.object.sha;
      // create a branch
      var branchName = 'branch-' + issue.number;
      var refName = 'refs/heads/' + branchName;
      console.log('creating branch ' + branchName);
      return repo.git.refs.create({sha: sha, ref:refName}).then(function(newRef) {
        console.log('created branch ' + branchName);
        // new branch created. Update the contents of THE_CODE
        return repo.contents(THE_CODE).fetch().then(function(readme) {
          console.log('read readme for ' + branchName);
          var content = atob(readme.content).split('\n');
          content.splice(rand(content.length-2)+2, 0, '\n\nAdding PR for ' + branchName + '\n\n');
          var message = 'Commit PR for ' + branchName;
          console.log('updating readme on ' + branchName);

          return repo.contents(THE_CODE).add({path:THE_CODE, message:message, branch:branchName, sha:readme.sha, content:btoa(content.join('\n'))}).then(function(updatedCodeFile) {
            console.log('updated readme');
            //create the Pull Request
            var body = ['Does something awesome'];
            body.push('');
            body.push('fixes #' + issue.number);
            body.push('');
            // TODO: Decide if this part should include the different formats for time tracking (tt)
            body.push('---')
            body.push('<tt>4</tt>');
            console.log('creating actual PR');
            var prCreateConfig = {title:'This is an awesome solution (autogen for ' + issue.number + ')', head:branchName, base:'master',body:body.join('\n')};
            console.log(prCreateConfig);
            return repo.pulls.create(prCreateConfig).then(function(pr) {
              console.log('created actual PR. Adding to issue');
              // issueBody = [issue.body];
              // issueBody.push('- fixed by #' + pr.number);
              // return issue.update({body: issueBody.join('\n')}).then(function(newIssue) {
              //   // Decide whether to merge
              //   if (rand(2) === 0) {
              //     // Merge it. Which means the issue should have been in QA
              //     console.log('merging PR');
              //     return repo.pulls(pr.number).merge.add({commitMessage: message, sha: updatedCodeFile.sha});
              //   }
              // });

              // Decide whether to merge
              if (rand(3) !== 0) {
                // Merge it. Which means the issue should have been in QA
                console.log('merging PR');
                return repo.pulls(pr.number).merge.add({commitMessage: message, sha: updatedCodeFile.sha}).then(function() {
                  // Delete the branch
                  return repo.git.refs('heads', branchName).remove();
                });
              }
            });
          });
        });

      })
    });
  })
  return issue.update({state: 'closed'});
}

allDone = Promise.all(CONFIG.map(function(epic) {
  var options1 = {title: epic.title};
  console.log('Creating milestone');
  return repo.milestones.create(options1).then(function(milestone) {
    console.log('Adding issues');
    return Promise.all(epic.stories.map(function(story) {
      var todoItems = rand(5);
      var doneItems = rand(todoItems);
      var body = [
        'Some text describing the story. Discussion about change requests go directly here as comments.',
        ''
      ];
      if (todoItems) {
        body.push('# TODO');
        body.push('');
        for (var i=0;i<todoItems;i++) {
          if (i < doneItems) {
            body.push('- [x] ' + TASK_LABELS[i]);
          } else {
            body.push('- [ ] ' + TASK_LABELS[i]);
          }
        }
      }
      var starsCount = rand(4);
      var stars = '';
      var labels = ['Story'];
      if (starsCount === 1) { labels.push('★'); }
      else if (starsCount === 2) { labels.push('★★'); }
      else if (starsCount === 3) { labels.push('★★★★★'); }
      if (rand(4) === 0) { labels.push('Change Request'); }
      var options2 = {title: story.title, body: body.join('\n'), milestone: milestone.number, labels: labels};
      console.log('Creating issue');
      return repo.issues.create(options2).then(function(issue) {
        // Randomly create a Pull Request and then randomly close the issue because it is done
        if (rand(3) !== 0) {
          return createPullRequest(issue);
        }
      });
    }));
  })
})).then(function() { console.log('All Done!')}, function(err) { console.log('Error'); console.log(err); });
//   })
// })));
