// props: score(점수), total(전체), onRestart(리셋 함수)
export default function ResultPanel({ score, total, onRestart }) {
  const percent = total ? Math.round((score / total) * 100) : 0; // 퍼센트 계산
  return (
    <div style={{
      marginTop: 16, padding: 16, borderRadius: 12,
      border: '1px solid #eee', background: '#F8FAFC'
    }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>
        결과: {score} / {total} ({percent}%)
      </div>
      <button onClick={onRestart}>다시 풀기</button>
    </div>
  );
}
