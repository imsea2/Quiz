// props: question(객체), selected(내가 고른 인덱스), onSelect(클릭 핸들러)
export default function QuestionCard({ question, selected, onSelect }) {
  // 객체에서 값 꺼내쓰기
  const { text, choices, answer } = question;

  // 선택했는지 여부
  const didSelect = selected !== undefined;

  return (
    <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
      {/* 문제 텍스트 */}
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{text}</div>

      {/* 보기 리스트(배열 map) */}
      <div style={{ display: 'grid', gap: 8 }}>
        {choices.map((choice, idx) => {
          // 버튼 색깔(선택 전: 기본 / 선택 후: 정답 초록, 오답 빨강)
          const isChosen = selected === idx;
          const isCorrect = didSelect && idx === answer;
          const isWrong = didSelect && isChosen && idx !== answer;

          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}              // 클릭 → 선택 저장
              disabled={didSelect}                       // 한번 고르면 잠가서 바꾸지 않게(학습용)
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid #ddd',
                background: isCorrect ? '#DCFCE7' : isWrong ? '#FEE2E2' : 'white',
                cursor: didSelect ? 'default' : 'pointer'
              }}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {/* 피드백 문구 */}
      {didSelect && (
        <div style={{ marginTop: 10, fontSize: 14 }}>
          {selected === answer ? '정답! 🎉' : `아쉽다! 정답은 "${choices[answer]}"`}
        </div>
      )}
    </div>
  );
}
