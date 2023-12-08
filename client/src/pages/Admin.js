import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Admin.module.css";
import currentLecture from "../data/currentLecture";
import { useLocation } from "react-router-dom";

function AdminPage() {
  const [classData, setClassData] = useState([]);
  const [lambdaData, setLambdaData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);

  const location = useLocation();
  const num = location.state.user_number;

  useEffect(() => {
    const apiUrl = "http://localhost:12000/api/class";
    const apiUrlUser = "http://localhost:12000/api/user";
    const GatewayUrl = "http://localhost:12000/lambda";
    const apiUrlList = "http://localhost:12000/api/list";
    axios
      .get(apiUrl, {
        params: {
          u_num: num,
        },
      })
      .then((response) => {
        // 받아온 데이터를 상태에 설정
        setClassData(response.data);
        // setSelectedClass(response.data[0]);
      })
      .catch((error) => console.error("데이터 가져오기 실패: ", error));

    axios
      .get(apiUrlUser, {
        params: {
          u_num: num,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.error("나가 하지마"));

    axios
      .get(GatewayUrl)
      .then((response) => {
        setLambdaData(response.data);
      })
      .catch((error) => console.error("Lambda 함수 호출 중 에러 발생:", error));

    axios
      .get(apiUrlUser, {
        params: {
          u_num: num,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.error("나가 하지마"));

    axios
      .get(apiUrlList, {
        params: {
          c_id: classData[selectedClassIndex].class_id,
        },
      })
      .then((response) => {
        // 받아온 데이터를 상태에 설정
        console.log(classData[selectedClassIndex]?.class_id);
        console.log(response.data);
        // setSelectedClass(response.data[0]);
      })
      .catch((error) => console.error("데이터 가져오기 실패: ", error));
  }, []);

  const handleClassItemClick = (index) => {
    // 클릭한 인덱스를 기반으로 선택한 클래스 설정
    console.log(index);
    setSelectedClassIndex(index);
    // setSelectedClass(classData[index]);
  };

  return (
    <div>
      <header className={styles.Header_block}>
        <div className={styles.Profile}>
          {userData.map((userItem, index) => (
            <span>
              {userItem.user_name} 님 | {userItem.user_major}
            </span>
          ))}
        </div>
      </header>
      <div className={styles.Body_block}>
        <div className={styles.Left_block}>
          <h2>수업 목록</h2>
          <ul className={styles.Class_list}>
            {classData.map((classItem, index) => (
              <li key={index} onClick={() => handleClassItemClick(index)}>
                {classItem.class_name} ({classItem.class_sep})
                <span>{classItem.class_prof} 교수님</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.Right_block}>
          <div className={styles.Class_block}>
            <h2>
              {classData[selectedClassIndex]?.class_name} (
              {classData[selectedClassIndex]?.class_sep})
            </h2>
            <div>
              {currentLecture.currentLecture.time}
              <span>(48/48)</span>
            </div>
          </div>
          <div className={styles.List_block}>
            <h2>학생 리스트</h2>
          </div>
          <div>
            {lambdaData.map((lambdaItem, index) => (
              <div key={index}>
                <p>{lambdaItem.image}</p>
                <p>{lambdaItem.similarity} 정확도</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
