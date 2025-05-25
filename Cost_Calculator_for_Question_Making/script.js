console.log("Script loaded"); // Debugging to confirm script execution

// Default classes data if JSON fetch fails
let classesData = {
    'Nursery': [],
    'Class 1': [],
    'Class 2': [],
    'Class 3': [],
    'Class 4': [],
    'Class 5': [],
    'Class 9': [
        { name: 'বাংলা ১ম', special: false },
        { name: 'বাংলা ২য়', special: false },
        { name: 'English 1st', special: false },
        { name: 'English 2nd', special: false },
        { name: 'তথ্য ও যোগাযোগ প্রযুক্তি', special: false },
        { name: 'কৃষি শিক্ষা', special: false },
        { name: 'পদার্থবিজ্ঞান', special: true },
        { name: 'রসায়ন', special: true },
        { name: 'জীববিজ্ঞান', special: false },
        { name: 'বিজ্ঞান', special: false },
        { name: 'সাধারণ গণিত', special: true },
        { name: 'ফ্রিল্যান্স ও ব্যাংকিং', special: false },
        { name: 'ব্যবসা উদ্যোগ', special: false },
        { name: 'পৌরনীতি ও নাগরিকতা', special: false },
        { name: 'হিন্দু ধর্ম', special: false },
        { name: 'ইসলাম শিক্ষা', special: false },
        { name: 'উচ্চতর গণিত', special: true },
        { name: 'বাংলাদেশের ইতিহাস', special: false }
    ],
    'Class 10': [
        { name: 'বাংলা ১ম', special: false },
        { name: 'বাংলা ২য়', special: false },
        { name: 'English 1st', special: false },
        { name: 'English 2nd', special: false },
        { name: 'তথ্য ও যোগাযোগ প্রযুক্তি', special: false },
        { name: 'কৃষি শিক্ষা', special: false },
        { name: 'পদার্থবিজ্ঞান', special: true },
        { name: 'রসায়ন', special: true },
        { name: 'জীববিজ্ঞান', special: false },
        { name: 'বিজ্ঞান', special: false },
        { name: 'সাধারণ গণিত', special: true },
        { name: 'ফ্রিল্যান্স ও ব্যাংকিং', special: false },
        { name: 'ব্যবসা উদ্যোগ', special: false },
        { name: 'পৌরনীতি ও নাগরিকতা', special: false },
        { name: 'ভূগোল ও পরিবেশ', special: false },
        { name: 'হিন্দু ধর্ম', special: false },
        { name: 'ইসলাম শিক্ষা', special: false },
        { name: 'উচ্চতর গণিত', special: true }
    ]
};

// Fetch classesData.json on page load
fetch('classesData.json')
    .then(response => {
        if (!response.ok) throw new Error('Failed to fetch classesData.json');
        return response.json();
    })
    .then(data => {
        classesData = data;
        updateClassDropdowns();
        console.log("classesData.json loaded successfully", classesData);
    })
    .catch(error => {
        console.error("Error fetching classesData.json, using default data", error);
        updateClassDropdowns();
    });

// Manual JSON upload option
document.getElementById('json-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                classesData = JSON.parse(e.target.result);
                updateClassDropdowns();
                console.log("JSON uploaded successfully", classesData);
            } catch (err) {
                console.error("Error parsing JSON", err);
                alert("Invalid JSON file. Using current data.");
            }
        };
        reader.readAsText(file);
    }
});

function populateManageModal() {
    console.log("Populating manage modal"); // Debugging
    const classesList = document.getElementById('classes-list');
    classesList.innerHTML = '';
    for (const className in classesData) {
        const classDiv = document.createElement('div');
        classDiv.className = 'mb-3';
        classDiv.innerHTML = `
            <div class="input-group mb-2">
                <input type="text" class="form-control" value="${className}">
                <button class="btn btn-danger delete-class">Delete Class</button>
            </div>
            <div class="subjects-list ms-3"></div>
            <button class="btn btn-sm btn-secondary add-subject">Add Subject</button>
        `;
        const subjectsList = classDiv.querySelector('.subjects-list');
        classesData[className].forEach(subject => {
            const subjectDiv = document.createElement('div');
            subjectDiv.className = 'input-group mb-1';
            subjectDiv.innerHTML = `
                <input type="text" class="form-control" value="${subject.name}">
                <div class="input-group-text">
                    <input type="checkbox" ${subject.special ? 'checked' : ''}> Special
                </div>
                <button class="btn btn-danger delete-subject">Delete</button>
            `;
            subjectsList.appendChild(subjectDiv);
            subjectDiv.querySelector('.delete-subject').addEventListener('click', () => {
                subjectDiv.remove();
            });
        });
        classDiv.querySelector('.add-subject').addEventListener('click', () => {
            const newSubjectDiv = document.createElement('div');
            newSubjectDiv.className = 'input-group mb-1';
            newSubjectDiv.innerHTML = `
                <input type="text" class="form-control" placeholder="Subject Name">
                <div class="input-group-text">
                    <input type="checkbox"> Special
                </div>
                <button class="btn btn-danger delete-subject">Delete</button>
            `;
            subjectsList.appendChild(newSubjectDiv);
            newSubjectDiv.querySelector('.delete-subject').addEventListener('click', () => {
                newSubjectDiv.remove();
            });
        });
        classDiv.querySelector('.delete-class').addEventListener('click', () => {
            classDiv.remove();
        });
        classesList.appendChild(classDiv);
    }
    const addClassBtn = document.createElement('button');
    addClassBtn.className = 'btn btn-primary mt-3';
    addClassBtn.textContent = 'Add Class';
    addClassBtn.addEventListener('click', () => {
        const newClassDiv = document.createElement('div');
        newClassDiv.className = 'mb-3';
        newClassDiv.innerHTML = `
            <div class="input-group mb-2">
                <input type="text" class="form-control" placeholder="New Class Name">
                <button class="btn btn-danger delete-class">Delete Class</button>
            </div>
            <div class="subjects-list ms-3"></div>
            <button class="btn btn-sm btn-secondary add-subject">Add Subject</button>
        `;
        newClassDiv.querySelector('.delete-class').addEventListener('click', () => {
            newClassDiv.remove();
        });
        newClassDiv.querySelector('.add-subject').addEventListener('click', () => {
            const subjectsList = newClassDiv.querySelector('.subjects-list');
            const newSubjectDiv = document.createElement('div');
            newSubjectDiv.className = 'input-group mb-1';
            newSubjectDiv.innerHTML = `
                <input type="text" class="form-control" placeholder="Subject Name">
                <div class="input-group-text">
                    <input type="checkbox"> Special
                </div>
                <button class="btn btn-danger delete-subject">Delete</button>
            `;
            subjectsList.appendChild(newSubjectDiv);
            newSubjectDiv.querySelector('.delete-subject').addEventListener('click', () => {
                newSubjectDiv.remove();
            });
        });
        classesList.appendChild(newClassDiv);
    });
    classesList.appendChild(addClassBtn);
}

function saveClassesData() {
    console.log("Saving classes data"); // Debugging
    const classesList = document.getElementById('classes-list');
    const newClassesData = {};
    classesList.querySelectorAll('.mb-3').forEach(classDiv => {
        const classInput = classDiv.querySelector('input[type="text"]');
        const className = classInput.value.trim();
        if (className) {
            newClassesData[className] = [];
            const subjectsList = classDiv.querySelector('.subjects-list');
            subjectsList.querySelectorAll('.input-group').forEach(subjectDiv => {
                const subjectInput = subjectDiv.querySelector('input[type="text"]');
                const specialCheckbox = subjectDiv.querySelector('input[type="checkbox"]');
                const subjectName = subjectInput.value.trim();
                if (subjectName) {
                    newClassesData[className].push({
                        name: subjectName,
                        special: specialCheckbox.checked
                    });
                }
            });
        }
    });
    classesData = newClassesData;
    updateClassDropdowns();
    // Download updated JSON
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(classesData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "classesData.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

function updateClassDropdowns() {
    console.log("Updating class dropdowns"); // Debugging
    const questionPapers = document.querySelectorAll('.question-paper');
    questionPapers.forEach(qp => {
        const classSelect = qp.querySelector('.class-select');
        const currentValue = classSelect.value;
        classSelect.innerHTML = '';
        for (const className in classesData) {
            const option = document.createElement('option');
            option.value = className;
            option.textContent = className;
            classSelect.appendChild(option);
        }
        if (classesData[currentValue]) {
            classSelect.value = currentValue;
        } else {
            classSelect.value = Object.keys(classesData)[0] || '';
        }
        classSelect.dispatchEvent(new Event('change'));
    });
}

function addQuestionPaper() {
    console.log("Adding question paper"); // Debugging
    const qpDiv = document.createElement('div');
    qpDiv.className = 'question-paper card mb-3';
    qpDiv.innerHTML = `
        <div class="card-body">
            <div class="mb-3">
                <label class="form-label">Class</label>
                <select class="form-select class-select"></select>
            </div>
            <div class="mb-3 subject-group" style="display: none;">
                <label class="form-label">Subject</label>
                <select class="form-select subject-select"></select>
            </div>
            <div class="mb-3 question-types">
                <label class="form-label">Question Types</label>
                <div>
                    <input type="checkbox" class="cq-checkbox"> CQ
                    <input type="checkbox" class="mcq-checkbox"> MCQ
                </div>
            </div>
            <div class="question-parts"></div>
            <div class="cost-display">
                <p>Typing Cost: <span class="typing-cost">0.00</span> taka</p>
                <p>Printing Cost: <span class="printing-cost">0.00</span> taka</p>
                <p>Total Photocopy Cost: <span class="photocopy-total">0.00</span> taka</p>
                <p>Total Cost: <span class="total-cost">0.00</span> taka</p>
            </div>
            <button class="btn btn-danger remove-qp">Remove</button>
        </div>
    `;
    const classSelect = qpDiv.querySelector('.class-select');
    for (const className in classesData) {
        const option = document.createElement('option');
        option.value = className;
        option.textContent = className;
        classSelect.appendChild(option);
    }
    const subjectGroup = qpDiv.querySelector('.subject-group');
    const subjectSelect = qpDiv.querySelector('.subject-select');
    const questionTypes = qpDiv.querySelector('.question-types');
    const questionParts = qpDiv.querySelector('.question-parts');
    const cqCheckbox = qpDiv.querySelector('.cq-checkbox');
    const mcqCheckbox = qpDiv.querySelector('.mcq-checkbox');

    function updateQuestionParts() {
        questionParts.innerHTML = '';
        const classValue = classSelect.value;
        const subjectValue = subjectSelect.value;
        const isLowerClass = ['Nursery', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'].includes(classValue);
        const isExemptSubject = ['English 1st', 'English 2nd', 'তথ্য ও যোগাযোগ প্রযুক্তি'].includes(subjectValue);

        // Adjust checkbox visibility based on class and subject
        if (isLowerClass || isExemptSubject) {
            cqCheckbox.checked = true;
            mcqCheckbox.checked = false;
            mcqCheckbox.disabled = true;
        } else {
            mcqCheckbox.disabled = false;
        }

        if (cqCheckbox.checked) {
            const cqDiv = document.createElement('div');
            cqDiv.className = 'question-part mb-3';
            cqDiv.innerHTML = `
                <h6>CQ</h6>
                <div class="mb-2">
                    <label class="form-label">Page Type</label>
                    <div>
                        <input type="radio" name="cq_page_type_${Date.now()}" value="single" checked> Single Page
                        <input type="radio" name="cq_page_type_${Date.now()}" value="double"> Double Page
                    </div>
                </div>
                <div class="mb-2">
                    <label class="form-label">Number of Copies</label>
                    <input type="number" class="form-control cq-copies" value="1" min="0">
                </div>
            `;
            questionParts.appendChild(cqDiv);
            cqDiv.querySelectorAll('input[name^="cq_page_type"]').forEach(radio => {
                radio.addEventListener('change', calculateCosts);
            });
            cqDiv.querySelector('.cq-copies').addEventListener('input', calculateCosts);
        }
        if (mcqCheckbox.checked && !isLowerClass && !isExemptSubject) {
            const mcqDiv = document.createElement('div');
            mcqDiv.className = 'question-part mb-3';
            mcqDiv.innerHTML = `
                <h6>MCQ</h6>
                <div class="mb-2">
                    <label class="form-label">Page Type</label>
                    <div>
                        <input type="radio" name="mcq_page_type_${Date.now()}" value="single" checked> Single Page
                        <input type="radio" name="mcq_page_type_${Date.now()}" value="double"> Double Page
                    </div>
                </div>
                <div class="mb-2">
                    <label class="form-label">Number of Copies</label>
                    <input type="number" class="form-control mcq-copies" value="1" min="0">
                </div>
            `;
            questionParts.appendChild(mcqDiv);
            mcqDiv.querySelectorAll('input[name^="mcq_page_type"]').forEach(radio => {
                radio.addEventListener('change', calculateCosts);
            });
            mcqDiv.querySelector('.mcq-copies').addEventListener('input', calculateCosts);
        }
        calculateCosts();
    }

    classSelect.addEventListener('change', function() {
        subjectSelect.innerHTML = '';
        if (classesData[this.value] && classesData[this.value].length > 0) {
            subjectGroup.style.display = 'block';
            classesData[this.value].forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.name;
                option.textContent = subject.name;
                subjectSelect.appendChild(option);
            });
        } else {
            subjectGroup.style.display = 'none';
            cqCheckbox.checked = true;
            mcqCheckbox.checked = false;
            mcqCheckbox.disabled = true;
        }
        subjectSelect.dispatchEvent(new Event('change'));
    });

    subjectSelect.addEventListener('change', updateQuestionParts);
    cqCheckbox.addEventListener('change', updateQuestionParts);
    mcqCheckbox.addEventListener('change', updateQuestionParts);

    qpDiv.querySelector('.remove-qp').addEventListener('click', () => {
        qpDiv.remove();
        calculateCosts();
    });

    document.getElementById('question-papers').appendChild(qpDiv);
    classSelect.dispatchEvent(new Event('change'));
}

function calculateCosts() {
    console.log("Calculating costs"); // Debugging
    let grandTotal = 0;
    const questionPapers = document.querySelectorAll('.question-paper');
    questionPapers.forEach(qp => {
        const classSelect = qp.querySelector('.class-select');
        const subjectSelect = qp.querySelector('.subject-select');
        const cqCheckbox = qp.querySelector('.cq-checkbox');
        const mcqCheckbox = qp.querySelector('.mcq-checkbox');
        const classValue = classSelect.value;
        const subjectValue = subjectSelect.value;

        const typingRegular = parseFloat(document.getElementById('typing_regular').value) || 0;
        const typingSpecial = parseFloat(document.getElementById('typing_special').value) || 0;
        const printingSingle = parseFloat(document.getElementById('printing_single').value) || 0;
        const printingDouble = parseFloat(document.getElementById('printing_double').value) || 0;
        const photocopySingle = parseFloat(document.getElementById('photocopy_single').value) || 0;
        const photocopyDouble = parseFloat(document.getElementById('photocopy_double').value) || 0;

        let typingCost = typingRegular;
        if (classesData[classValue]) {
            const subject = classesData[classValue].find(s => s.name === subjectValue);
            if (subject && subject.special) {
                typingCost = typingSpecial;
            }
        }

        let totalTyping = 0;
        let totalPrinting = 0;
        let totalPhotocopy = 0;

        if (cqCheckbox.checked) {
            const cqDiv = qp.querySelector('.question-part:has(.cq-copies)');
            if (cqDiv) {
                const pageType = Array.from(cqDiv.querySelectorAll('input[name^="cq_page_type"]')).find(r => r.checked).value;
                const copies = parseInt(cqDiv.querySelector('.cq-copies').value) || 0;
                totalTyping += typingCost;
                totalPrinting += pageType === 'single' ? printingSingle : printingDouble;
                totalPhotocopy += (pageType === 'single' ? photocopySingle : photocopyDouble) * copies;
            }
        }

        if (mcqCheckbox.checked) {
            const mcqDiv = qp.querySelector('.question-part:has(.mcq-copies)');
            if (mcqDiv) {
                const pageType = Array.from(mcqDiv.querySelectorAll('input[name^="mcq_page_type"]')).find(r => r.checked).value;
                const copies = parseInt(mcqDiv.querySelector('.mcq-copies').value) || 0;
                totalTyping += typingCost;
                totalPrinting += pageType === 'single' ? printingSingle : printingDouble;
                totalPhotocopy += (pageType === 'single' ? photocopySingle : photocopyDouble) * copies;
            }
        }

        const total = totalTyping + totalPrinting + totalPhotocopy;

        qp.querySelector('.typing-cost').textContent = totalTyping.toFixed(2);
        qp.querySelector('.printing-cost').textContent = totalPrinting.toFixed(2);
        qp.querySelector('.photocopy-total').textContent = totalPhotocopy.toFixed(2);
        qp.querySelector('.total-cost').textContent = total.toFixed(2);

        grandTotal += total;
    });
    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
}

function generatePDF() {
    console.log("Generating PDF"); // Debugging
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Question Paper Cost Calculation", 10, 10);
    const tableData = [];
    document.querySelectorAll('.question-paper').forEach(qp => {
        const classValue = qp.querySelector('.class-select').value;
        const subjectValue = qp.querySelector('.subject-select').value || 'N/A';
        const cqCheckbox = qp.querySelector('.cq-checkbox');
        const mcqCheckbox = qp.querySelector('.mcq-checkbox');

        if (cqCheckbox.checked) {
            const cqDiv = qp.querySelector('.question-part:has(.cq-copies)');
            if (cqDiv) {
                const pageType = Array.from(cqDiv.querySelectorAll('input[name^="cq_page_type"]')).find(r => r.checked).value;
                const copies = cqDiv.querySelector('.cq-copies').value;
                const typingCost = (parseFloat(qp.querySelector('.typing-cost').textContent) / (cqCheckbox.checked + mcqCheckbox.checked)).toFixed(2);
                const printingCost = (pageType === 'single' ? parseFloat(document.getElementById('printing_single').value) : parseFloat(document.getElementById('printing_double').value)).toFixed(2);
                const photocopyTotal = ((pageType === 'single' ? parseFloat(document.getElementById('photocopy_single').value) : parseFloat(document.getElementById('photocopy_double').value)) * parseInt(copies)).toFixed(2);
                const totalCost = (parseFloat(typingCost) + parseFloat(printingCost) + parseFloat(photocopyTotal)).toFixed(2);
                tableData.push([
                    classValue,
                    subjectValue,
                    'CQ',
                    pageType.charAt(0).toUpperCase() + pageType.slice(1),
                    copies,
                    typingCost,
                    printingCost,
                    photocopyTotal,
                    totalCost
                ]);
            }
        }

        if (mcqCheckbox.checked) {
            const mcqDiv = qp.querySelector('.question-part:has(.mcq-copies)');
            if (mcqDiv) {
                const pageType = Array.from(mcqDiv.querySelectorAll('input[name^="mcq_page_type"]')).find(r => r.checked).value;
                const copies = mcqDiv.querySelector('.mcq-copies').value;
                const typingCost = (parseFloat(qp.querySelector('.typing-cost').textContent) / (cqCheckbox.checked + mcqCheckbox.checked)).toFixed(2);
                const printingCost = (pageType === 'single' ? parseFloat(document.getElementById('printing_single').value) : parseFloat(document.getElementById('printing_double').value)).toFixed(2);
                const photocopyTotal = ((pageType === 'single' ? parseFloat(document.getElementById('photocopy_single').value) : parseFloat(document.getElementById('photocopy_double').value)) * parseInt(copies)).toFixed(2);
                const totalCost = (parseFloat(typingCost) + parseFloat(printingCost) + parseFloat(photocopyTotal)).toFixed(2);
                tableData.push([
                    classValue,
                    subjectValue,
                    'MCQ',
                    pageType.charAt(0).toUpperCase() + pageType.slice(1),
                    copies,
                    typingCost,
                    printingCost,
                    photocopyTotal,
                    totalCost
                ]);
            }
        }
    });
    doc.autoTable({
        head: [['Class', 'Subject', 'Type', 'Page Type', 'Copies', 'Typing Cost', 'Printing Cost', 'Photocopy Total', 'Total Cost']],
        body: tableData,
        startY: 20
    });
    doc.text(`Grand Total: ${document.getElementById('grand-total').textContent} taka`, 10, doc.lastAutoTable.finalY + 10);
    doc.save('cost_calculation.pdf');
}

document.getElementById('add-question-paper').addEventListener('click', addQuestionPaper);
document.getElementById('save-changes').addEventListener('click', () => {
    saveClassesData();
    document.querySelector('#manageModal .btn-close').click();
});
document.getElementById('manage-classes-subjects').addEventListener('click', populateManageModal);
document.getElementById('generate-pdf').addEventListener('click', generatePDF);
['typing_regular', 'typing_special', 'printing_single', 'printing_double', 'photocopy_single', 'photocopy_double'].forEach(id => {
    document.getElementById(id).addEventListener('input', calculateCosts);
});