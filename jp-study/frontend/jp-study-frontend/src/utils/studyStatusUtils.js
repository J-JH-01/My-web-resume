export const makeStudyStatusKey = (contentType, contentNo) => {
  return `${contentType}-${contentNo}`;
};

export const makeStudyStatusMap = (statusList) => {
  const statusMap = {};

  statusList.forEach((status) => {
    const key = makeStudyStatusKey(status.contentType, status.contentNo);
    statusMap[key] = status.studyStatus;
  });

  return statusMap;
};

export const getStudyStatusClass = (studyStatus) => {
  if (studyStatus === "KNOWN") return "known";
  if (studyStatus === "VAGUE") return "vague";
  if (studyStatus === "UNKNOWN") return "unknown";

  return "none";
};

export const getStudyStatusText = (studyStatus) => {
  if (studyStatus === "KNOWN") return "맞춤";
  if (studyStatus === "VAGUE") return "애매함";
  if (studyStatus === "UNKNOWN") return "모름";

  return "미학습";
};

export const fetchMyStudyStatusList = async () => {
  const res = await fetch("/api/study-status", {
    credentials: "include",
  });

  if (res.status === 401) {
    return [];
  }

  if (!res.ok) {
    throw new Error("학습 상태 조회 실패");
  }

  return res.json();
};