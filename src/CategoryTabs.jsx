export default function CategoryTabs({ current, onChange, tabs }) {
    return (
        <div style={{ display: 'flex', gap: 8, margin: '16px 0', flexWrap: 'wrap' }}>
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: 12,
                        border: current === tab ? '2px solid black' : '1px solid #ddd',
                        background: 'white',
                        cursor: 'pointer'
                    }}
                >
                    {tab}
                </button>
            ))}


        </div>
    );
}