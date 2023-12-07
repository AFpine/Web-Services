import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Admin.module.css";
import userCourses from "../data/userCourses";
import currentLecture from "../data/currentLecture";

function AdminPage() {
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:12000/api/class";

    axios
      .get(apiUrl)
      .then((response) => {
        // 받아온 데이터를 상태에 설정
        setClassData(response.data);
      })
      .catch((error) => console.error("데이터 가져오기 실패: ", error));
  }, []);

  return (
    <div>
      <header className={styles.Header_block}>
        <div className={styles.Profile}>
          <span>지수인</span> 님 | 컴퓨터공학부
        </div>
      </header>
      <div className={styles.Body_block}>
        <div className={styles.Left_block}>
          <h2>수업 목록</h2>
          <ul className={styles.Class_list}>
            {userCourses.courses.map((course, index) => (
              <li key={index}>
                {course.courseName} <span>{course.professorName} 교수님</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.Right_block}>
          <div className={styles.Class_block}>
            <h2>{currentLecture.currentLecture.name}</h2>
            <div>
              {currentLecture.currentLecture.time}
              <span>(48/48)</span>
            </div>
          </div>
          <div className={styles.List_block}>
            <h2>학생 리스트</h2>
          </div>
          <div className={styles.Log_block}>
            <h2>[11:30] 출석 로그</h2>
          </div>
          <div>
            {/* 임시 데이터 출력 */}
            {classData.map((classItem, index) => (
              <div key={index}>
                <p>{classItem.class_name}</p>
                <p>{classItem.class_prof} 교수님</p>
                {/* 원하는 다른 데이터 표시 */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
