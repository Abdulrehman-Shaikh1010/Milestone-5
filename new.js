document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeOutput = document.getElementById('resume-output');
    var resumeContent = document.getElementById('resume-content');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var experience = document.getElementById('experience').value;
        var skills = document.getElementById('skills').value;
        if (name && email && phone && education && experience && skills) {
            resumeContent.innerHTML = "\n                <p><strong>Name:</strong> ".concat(name, "</p>\n                <p><strong>Email:</strong> ").concat(email, "</p>\n                <p><strong>Phone:</strong> ").concat(phone, "</p>\n                <p><strong>Education:</strong> ").concat(education, "</p>\n                <p><strong>Experience:</strong> ").concat(experience, "</p>\n                <p><strong>Skills:</strong> ").concat(skills, "</p>\n            ");
            resumeOutput.style.display = 'block';
        }
        else {
            alert('Please fill out all fields.');
        }
    });
});
