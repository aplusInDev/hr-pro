import httpClient from "../../services/httpClient";


export default async function evaluationLoader({ params }) {
  try {
    const traineeId = JSON.parse(localStorage.getItem("currentUser"))?.employee_id;
    const trainingId = params.trainingId;
    const checkEvaluationStatus = await httpClient.get(
      `/check_evaluation_status?trainee_id=${traineeId}&training_id=${trainingId}`);
    const data = {
      ...checkEvaluationStatus.data,
      trainingId
    }
    return data;
  } catch (err) {
    console.log("error");
    return null;
  }
}
