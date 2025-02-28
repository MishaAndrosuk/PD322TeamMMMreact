import http from "../../../http_common"

import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "student",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        }
      ],
      "name": "CourseBought",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        }
      ],
      "name": "buyCourse",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "student",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        }
      ],
      "name": "hasPurchased",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "purchasedCourses",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
const API_URL = "http://localhost:8000/api/";

export const buyCourse = (courseId, studentId) => async (dispatch) => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        const balance = await provider.getBalance(await signer.getAddress());

        const requiredAmount = ethers.utils.parseEther("0.00"); 
        if (balance.lt(requiredAmount)) {
            throw new Error("Недостатньо коштів для виконання транзакції");
        }

        const tx = await contract.buyCourse(courseId, { value: requiredAmount });
        await tx.wait();

        await fetch(`${API_URL}buy/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ student: studentId, course_id: courseId, transaction_hash: tx.hash })
        });

        dispatch({ type: "BUY_COURSE_SUCCESS", payload: courseId });
    } catch (error) {
        dispatch({ type: "BUY_COURSE_ERROR", payload: error.message });
    }
};

export const checkIfCoursePurchased = (courseId, studentId) => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}has_purchased/${studentId}/${courseId}/`);
        const data = await response.json();
        dispatch({ type: "CHECK_COURSE_PURCHASED", payload: { courseId, purchased: data.purchased } });
    } catch (error) {
        dispatch({ type: "CHECK_COURSE_ERROR", payload: error.message });
    }
};

export const fetchCourses = () => async (dispatch) => {
    try {
        const response = await http.get("/api/courses/");
        dispatch({ type: "FETCH_COURSES_SUCCESS", payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: "FETCH_COURSES_FAILURE", payload: error.message });
    }
};

export const createCourse = (courseData) => async (dispatch) => {
    try {
        const response = await http.post("/api/create/course/", courseData);
        dispatch({ type: "CREATE_COURSE", payload: response.data });
        return response.data;
    } catch (error) {
        console.error("createCourse error:", error);
    }
};

export const editCourse = (courseId, updatedData) => async (dispatch) => {
    try {
        const response = await http.put(`/api/edit/course/${courseId}`, updatedData);
        dispatch({ type: "EDIT_COURSE", payload: response.data });
    } catch (error) {
        console.error("editCourse error:", error);
    }
};

export const deleteCourse = (courseId) => async (dispatch) => {
    try {
        const response = await http.delete(`/api/delete/course/${courseId}`);
        if (response.status === 204) {
            dispatch({ type: "DELETE_COURSE", payload: courseId });
        }
    } catch (error) {
        console.error("deleteCourse error:", error);
    }
};
