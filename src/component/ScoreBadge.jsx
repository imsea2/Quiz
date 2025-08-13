// props: score(맞춘 개수), total(전체 문제 수)
export default function ScoreBadge({ score, total }) {
  return (
    <div style={{ position: 'relative' }}>
      <span role="img" aria-label="brain" style={{ fontSize: 28 }}>🧠</span> {/* 아이콘 */}
      <span
        style={{
          position: 'absolute', top: -6, right: -6,   // 위치
          background: 'black', color: 'white',        // 색상
          borderRadius: 999, padding: '2px 6px',      // 둥글/여백
          fontSize: 12
        }}
      >
        {score}/{total}                                {/* 현재 점수 */}
      </span>
    </div>
  );
}
