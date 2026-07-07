import React, { useState } from 'react'

export default function EnquiryForm({userInformation, setUserInformation}) {

    const [errors, setErrors] = useState([]);

    const formHandling = (event) => {
        event.preventDefault();

        let form = event.target;
        let fields = form.querySelectorAll(
            "input, textarea, select"
        );

        var errorNames = [];
        fields.forEach((v,i) => {
            // if(v.name == 'full_name'){
                if(v.value == ''){
                    errorNames.push(v.name);
                }
            // }
        });
        setErrors([...errorNames]);

        if(errors.length == 0){

            const data = {
                name : event.target.full_name.value.trim(),
                email : event.target.email.value,
                mobile_number : event.target.phone_number.value,
                subject : event.target.subject.value,
                message : event.target.message.value,
            }

            var finalData = [data, ...userInformation];

            setUserInformation(finalData)

            localStorage.setItem('user_infos', JSON.stringify(finalData));

            event.target.reset();
        }
    }


    const errorHandler = (e) => {
        if(errors.includes(e.target.name)){
            if(e.target.value != ''){
                var newErrors = errors.filter((v,i) => {
                    if(v != e.target.name){
                        return v
                    }
                })
                setErrors([...newErrors])
            }
        } else {
            if(e.target.value == ''){
                errors.push(e.target.name);
                setErrors([...errors])
            }
        }
    }

    return (
        <>
            <div className="col-lg-4">
                <div className="card border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} className="text-white p-4">
                        <h4 className="mb-0 fw-bold">📝 Send Enquiry</h4>
                    </div>
                    <div className="card-body p-4">
                        <form onSubmit={ formHandling } autoComplete='off'>
                            <div className="mb-3">
                                <label className="form-label fw-bold text-secondary">Full Name</label>
                                <input type="text" onKeyUp={ errorHandler } name='full_name' className={ errors.includes('full_name') ? 'form-control border-danger' : 'form-control' }  style={{ borderRadius: '8px', border: '1px solid #e0e0e0', padding: '10px 15px' }} placeholder="John Doe" />
                                {
                                    errors.includes('full_name')
                                    ?
                                    <p className='text-danger'>Name is required.</p>
                                    :
                                    ''
                                }
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold text-secondary">Email Address</label>
                                <input type="email" onKeyUp={ errorHandler } name='email' className="form-control" style={{ borderRadius: '8px', border: '1px solid #e0e0e0', padding: '10px 15px' }} placeholder="john@example.com" />
                                {
                                    errors.includes('email')
                                    ?
                                    <p className='text-danger'>Email is required.</p>
                                    :
                                    ''
                                }
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold text-secondary">Phone Number</label>
                                <input type="tel" onKeyUp={ errorHandler } name='phone_number' className="form-control" style={{ borderRadius: '8px', border: '1px solid #e0e0e0', padding: '10px 15px' }} placeholder="+1 (555) 123-4567" />
                                {
                                    errors.includes('phone_number')
                                    ?
                                    <p className='text-danger'>Phone Number is required.</p>
                                    :
                                    ''
                                }
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold text-secondary">Subject</label>
                                <select name='subject' onChange={ errorHandler } className="form-select" style={{ borderRadius: '8px', border: '1px solid #e0e0e0', padding: '10px 15px' }}>
                                    <option value={''}>Select a subject</option>
                                    <option>Website Development</option>
                                    <option>Mobile App</option>
                                    <option>UI/UX Design</option>
                                    <option>Cloud Migration</option>
                                    <option>Data Analytics</option>
                                </select>
                                {
                                    errors.includes('subject')
                                    ?
                                    <p className='text-danger'>Subject is required.</p>
                                    :
                                    ''
                                }
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold text-secondary">Message</label>
                                <textarea name='message' onKeyUp={ errorHandler } className="form-control" rows="4" style={{ borderRadius: '8px', border: '1px solid #e0e0e0', padding: '10px 15px' }} placeholder="Write your message here..."></textarea>
                                {
                                    errors.includes('message')
                                    ?
                                    <p className='text-danger'>Message is required.</p>
                                    :
                                    ''
                                }
                            </div>

                            <button type="submit" className="btn w-100 text-white fw-bold py-2" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '8px' }}>
                                Submit Enquiry →
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
