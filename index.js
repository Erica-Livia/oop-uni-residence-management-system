class Residence {
    constructor(name, address, isOccupied = false) {
        this.name = name;
        this.address = address;
        this.isOccupied = isOccupied;
    }
}

class DormRoom extends Residence {
    constructor(name, address, isOccupied, size) {
        super(name, address, isOccupied);
        this.size = size;
    }
}

class Apartment extends Residence {
    constructor(name, address, isOccupied, numberOfBedrooms) {
        super(name, address, isOccupied);
        this.numberOfBedrooms = numberOfBedrooms;
    }
}

class Student {
    constructor(name, studentID, gender, residence = null) {
        this.name = name;
        this.studentID = studentID;
        this.gender = gender;
        this.residence = residence;
    }

    assignResidence(residence) {
        this.residence = residence;
        residence.isOccupied = true;
    }
}

class MaintenanceRequest {
    constructor(description, status, student, assignedEmployee = null) {
        this.description = description;
        this.status = status;
        this.student = student;
        this.assignedEmployee = assignedEmployee;
    }

    assignEmployee(employee) {
        this.assignedEmployee = employee;
    }
}

const dormRooms = [];
const apartments = [];
const students = [];
const maintenanceRequests = [];
const employees = [];

function addDormRoom() {
    const name = document.getElementById('dormName').value;
    const address = document.getElementById('dormAddress').value;
    const size = document.getElementById('dormSize').value;

    const dorm = new DormRoom(name, address, false, size);
    dormRooms.push(dorm);

    displayDormRooms();
}

function addApartment() {
    const name = document.getElementById('aptName').value;
    const address = document.getElementById('aptAddress').value;
    const numberOfBedrooms = document.getElementById('aptBedrooms').value;

    const apartment = new Apartment(name, address, false, numberOfBedrooms);
    apartments.push(apartment);

    displayApartments();
}

function addStudent() {
    const name = document.getElementById('studentName').value;
    const studentID = document.getElementById('studentID').value;
    const gender = document.getElementById('studentGender').value;

    const student = new Student(name, studentID, gender);
    students.push(student);

    displayStudents();
}

function assignResidence() {
    const studentName = document.getElementById('assignStudentName').value;
    const residenceName = document.getElementById('assignResidenceName').value;

    const student = students.find(student => student.name === studentName);
    let residence = dormRooms.find(dorm => dorm.name === residenceName);

    if (!residence) {
        residence = apartments.find(apartment => apartment.name === residenceName);
    }

    if (student && residence) {
        student.assignResidence(residence);
        displayAssignedResidences();
    }
}

function addMaintenanceRequest() {
    const description = document.getElementById('requestDescription').value;
    const studentName = document.getElementById('requestStudentName').value;

    const student = students.find(student => student.name === studentName);

    if (student) {
        const request = new MaintenanceRequest(description, 'submitted', student);
        maintenanceRequests.push(request);

        displayMaintenanceRequests();
    }
}

function addEmployee() {
    const name = document.getElementById('employeeName').value;
    const employeeID = document.getElementById('employeeID').value;

    const employee = { name, employeeID };
    employees.push(employee);

    displayEmployees();
}

function assignEmployee() {
    const requestDescription = document.getElementById('assignRequestDescription').value;
    const employeeName = document.getElementById('assignEmployeeName').value;

    const request = maintenanceRequests.find(request => request.description === requestDescription);
    const employee = employees.find(employee => employee.name === employeeName);

    if (request && employee) {
        request.assignEmployee(employee.name);
        displayAssignedEmployees();
    }
}

function displayDormRooms() {
    const dormRoomList = document.getElementById('dormRoomList');
    dormRoomList.innerHTML = dormRooms.map(dorm => `
        <p>Name: ${dorm.name}, Address: ${dorm.address}, Size: ${dorm.size} sq ft, Occupied: ${dorm.isOccupied ? 'Yes' : 'No'}</p>
    `).join('');
}

function displayApartments() {
    const apartmentList = document.getElementById('apartmentList');
    apartmentList.innerHTML = apartments.map(apartment => `
        <p>Name: ${apartment.name}, Address: ${apartment.address}, Bedrooms: ${apartment.numberOfBedrooms}, Occupied: ${apartment.isOccupied ? 'Yes' : 'No'}</p>
    `).join('');
}

function displayStudents() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = students.map(student => `
        <p>Name: ${student.name}, Student ID: ${student.studentID}, Gender: ${student.gender}, Residence: ${student.residence ? student.residence.name : 'None'}</p>
    `).join('');
}

function displayAssignedResidences() {
    const assignedResidenceList = document.getElementById('assignedResidenceList');
    assignedResidenceList.innerHTML = students.filter(student => student.residence).map(student => `
        <p>Student: ${student.name}, Residence: ${student.residence.name}</p>
    `).join('');
}

function displayMaintenanceRequests() {
    const maintenanceRequestList = document.getElementById('maintenanceRequestList');
    maintenanceRequestList.innerHTML = maintenanceRequests.map(request => `
        <p>Description: ${request.description}, Status: ${request.status}, Student: ${request.student.name}, Assigned Employee: ${request.assignedEmployee ? request.assignedEmployee : 'None'}</p>
    `).join('');
}

function displayEmployees() {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = employees.map(employee => `
        <p>Name: ${employee.name}, Employee ID: ${employee.employeeID}</p>
    `).join('');
}

function displayAssignedEmployees() {
    const assignedEmployeeList = document.getElementById('assignedEmployeeList');
    assignedEmployeeList.innerHTML = maintenanceRequests.filter(request => request.assignedEmployee).map(request => `
        <p>Request: ${request.description}, Assigned Employee: ${request.assignedEmployee}</p>
    `).join('');
}
