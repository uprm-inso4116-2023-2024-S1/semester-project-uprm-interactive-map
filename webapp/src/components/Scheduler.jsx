import './Scheduler.css';


function Scheduler(){
    return (<div>
        <div className="scheduler">
            <div className="header">
                <h1>Course Schedule</h1>
                <table>
                    <tr>
                        <td>Class code</td>
                        <td>Time</td>
                        <td>Days</td>
                        <td>Professor</td>
                        <td>Building</td>
                        <td>Classroom</td>
                    </tr>

                </table>
                <button className="addCourse">Add Course</button>
                <button className="editCourse">Edit Course</button>
                <button className="save">Save</button>

            </div>
        </div>
     </div>)
}

export default Scheduler