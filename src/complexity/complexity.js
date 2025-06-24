import React from 'react'

const complexity = ({name,bestCase,averageCase,worstCase,space}) => {
    return (
        <div className='Complexity'>
            <h3>{name} Sort Complexity</h3>
            <table class="complexity-table">
                <thead>
                    <tr>
                        <th>Case</th>
                        <th>Time Complexity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Best</td>
                        <td>{bestCase}</td>
                    </tr>
                    <tr>
                        <td>Average</td>
                        <td>{averageCase}</td>
                    </tr>
                    <tr>
                        <td>Worst</td>
                        <td>{worstCase}</td>
                    </tr>
                    <tr class="space-row">
                        <td><strong>Space</strong></td>
                        <td><strong>{space}</strong></td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default complexity