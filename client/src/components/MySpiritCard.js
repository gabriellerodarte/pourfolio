

function MySpiritCard({ spirit }) {
    

    return (
        <div>
            <div key={spirit.id}>
                <h3>{spirit?.name}</h3>
                <p>{spirit?.cocktails?.length} cocktails</p>
                <p>{'>'}</p>
            </div>
        </div>
    )
}

export default MySpiritCard