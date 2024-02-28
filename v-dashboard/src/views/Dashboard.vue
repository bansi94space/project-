<script lang="ts">
import { defineComponent} from 'vue'

interface Student {
  name: string;
  grade: number;
  subjects: string[];
}

export default defineComponent({
  name: 'TransformedStudents',
  data() {
    return {
      students: [
        { name: "John", grade: 9, subjects: ["Math", "Science", "History"] },
        { name: "Alice", grade: 10, subjects: ["Math", "Biology", "Physics"] },
        { name: "Bob", grade: 11, subjects: ["Chemistry", "Physics", "Literature"] }
      ] as Student[],
      searchQuery: '',
      showAddUserPopup: false,
      showEditUserPopup: false,
      newUser: {
        name: '',
        grade: 0,
        subjects:['']
      } as Student,
      editedUserIndex: -1,
      editedUser: {} as Student
      
    };
  },
  computed: {
    transformedStudents(): Record<string, string[]> {
      const result: Record<string, string[]> = {};
      this.students.forEach(student => {
        student.subjects.forEach(subject => {
          if (!result[subject]) {
            result[subject] = [];
          }
          result[subject].push(student.name);
        });
      });
      return result;
    },
    filteredStudents(): Student[] {
      return this.students.filter(student =>
        student.subjects.includes(this.searchQuery)
      );
    }
  },
  methods: {
    editStudent(index: number) {
      this.editedUserIndex = index;
      this.editedUser = { ...this.students[index] };
      this.showEditUserPopup = true;
    },
    addUser() {
      this.students.push({ ...this.newUser, subjects: this.newUser.subjects });
      this.newUser = { name: '', grade: 0, subjects: [''] };
      this.showAddUserPopup = false;
    },
    saveEditedUser() {
      if (this.editedUserIndex !== -1) {
        this.students.splice(this.editedUserIndex, 1, { ...this.editedUser, subjects: this.editedUser.subjects });
        this.editedUserIndex = -1;
        this.showEditUserPopup = false;
      }
    }
  }
});
</script>
<template>
  <div class="md:container md:mx-auto px-20 ">
    <h3 class="text-3xl font-medium text-gray-700 mt-20 text-center">
      Student Management 
    </h3>
    <div class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
      <div class="flex items-center">
        <div class="relative mx-4 lg:mx-0">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <input
            class="w-full min-w-96 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            type="text"
            v-model="searchQuery"
            placeholder="Search"
          >
        </div>
      </div>
      <div class="add-btn">
        <button class="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
        @click=" showAddUserPopup = true "
            >
            <span class="mx-1">Add User</span>
          </button>
          <div class="">
            <div
            v-if ="showAddUserPopup"  class="z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center"
    >
    <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
        @click=" showAddUserPopup = false "
      />
              
      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
      >
     
        <div
          class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
        >
          <svg
            class="text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>

        <!-- Add margin if you want to see some of the overlay behind the modal -->
        <div class="px-6 py-4 text-left modal-content">
          <!-- Title -->
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">
              Add Student
            </p>
            <div class="z-50 cursor-pointer modal-close" @click="showAddUserPopup = false">
              <svg
                class="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>

          <!-- Body -->
          <form >
          <div class="mb-4">
            <label
              for="add-name"
              class="block text-sm font-medium text-gray-700"
              >Name:</label
            >
            <input
              id="add-name"
              type="text"
              v-model="newUser.name"
              class="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div class="mb-4">
            <label
              for="add-grade"
              class="block text-sm font-medium text-gray-700"
              >Grade:</label
            >
            <input
              id="add-grade"
              type="number"
              v-model="newUser.grade"
              class="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div class="mb-4">
            <label
              for="add-subjects"
              class="block text-sm font-medium text-gray-700"
              >Subjects (comma-separated):</label
            >
            <input
              id="add-subjects"
              type="text"
              v-model="newUser.subjects"
              class="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        </form>
          <!-- Footer -->
          <div class="flex justify-end pt-2">
            <button
              class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
              @click="showAddUserPopup = false"
            >
              Close
            </button>
            <button
              class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
              @click="addUser"
            >
              Add student 
            </button>
          </div>
        </div>
      </div>
    </div>
          </div>
      </div>
    </div>
    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800 text-left"
                >
                  Name
                </th>
                <th
                  class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800 text-center"
                >
                Subjects
                </th>
                <th
                  class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800 text-right"
                >
                  Action
                </th>
              
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(students, subject) in transformedStudents" :key="subject">
                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                  <div class="flex items-center">
                      <div class="text-sm font-medium leading-5 text-gray-900">
                        {{ subject }}
                      </div>
                  </div>
                </td>
                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-center"
                >
                  <span>
                    <ul>
              <li v-for="student in students" :key="student" class="mb-1">{{ student }}</li>
            </ul></span>
                </td>
                <td
                  class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
                >
                <button @click="showEditUserPopup = true" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="showEditUserPopup" class=" z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
        @click=" showEditUserPopup = false "
      />
              
      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
      >
     
        <div
          class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
        >
          <svg
            class="text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>
        <div class="px-6 py-4 text-left modal-content">
          <!-- Title -->
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">
              Edit Student
            </p>
            <div class="z-50 cursor-pointer modal-close" @click="showEditUserPopup = false">
              <svg
                class="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>
        <!-- Form for editing user -->
        <form >
          <div class="mb-4">
            <label
              for="add-name"
              class="block text-sm font-medium text-gray-700"
              >Name:</label
            >
            <input
              id="add-name"
              type="text"
              v-model="editedUser.name"
              class="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div class="mb-4">
            <label
              for="add-grade"
              class="block text-sm font-medium text-gray-700"
              >Grade:</label
            >
            <input
              id="add-grade"
              type="number"
              v-model="editedUser.grade"
              class="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div class="mb-4">
            <label
              for="add-subjects"
              class="block text-sm font-medium text-gray-700"
              >Subjects (comma-separated):</label
            >
            <input
              id="add-subjects"
              type="text"
              v-model="editedUser.subjects"
              class="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        </form>
        <button @click="saveEditedUser" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
        <button @click="showEditUserPopup = false " class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg ml-2">Cancel</button>
      </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  </div>
</template>
