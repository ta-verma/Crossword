import React from 'react'

export default function CreateContest() {
    return (
        <div>
            <div className='container py-5'>
                <h3>Create Contest</h3>
                <form>
                    <div class="form-group row mt-3">
                        <label for="inputtext1" class="col-sm-2 col-form-label">Contest Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputtext1" placeholder="Contest Name" />
                        </div>
                    </div>
                    <div class="form-group row mt-3">
                        <label for="textarea1" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="textarea1" placeholder='Type here...' rows="3"></textarea>
                        </div>
                    </div>
                    <div class="form-group row mt-3">
                        <label for="starttime" class="col-sm-2 col-form-label">Start Time</label>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" id="starttime" placeholder="Start Time" onFocus={e => e.target.type = 'datetime-local'}
                                onBlur={e => e.target.type = 'text'} />
                        </div>
                    </div>
                    <div class="form-group row mt-3">
                        <label for="endtime" class="col-sm-2 col-form-label">End Time</label>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" id="endtime" placeholder="End Time" onFocus={e => e.target.type = 'datetime-local'}
                                onBlur={e => e.target.type = 'text'} />
                        </div>
                    </div>
                    <div class="form-group row mt-5">
                        <label for="addpuzzle" class="col-sm-2 col-form-label">Add Puzzle</label>
                        <div class="col-sm-6">
                            <select id="inputState" class="form-control">
                                <option selected>Choose Puzzle...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-outline-info">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
