import React from 'react'

export default function EnquiryData({userInformation}) {
    return (
        <>
            <div className="col-lg-8">
                <div className="card border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} className="text-white p-4">
                        <h4 className="mb-0 fw-bold">📊 Recent Enquiries</h4>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table mb-0">
                                <thead style={{ backgroundColor: '#f0f0f0' }}>
                                    <tr>
                                        <th className="fw-bold text-secondary">ID</th>
                                        <th className="fw-bold text-secondary">Name</th>
                                        <th className="fw-bold text-secondary">Email</th>
                                        <th className="fw-bold text-secondary">Subject</th>
                                        <th className="fw-bold text-secondary">Date</th>
                                        <th className="fw-bold text-secondary">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userInformation.map((v,i) => {
                                            return(
                                                <tr style={{ borderBottom: '1px solid #e0e0e0' }} key={i}>
                                                    <td className="fw-bold" style={{ color: '#667eea' }}>{ i+1 }</td>
                                                    <td>{ v.name }</td>
                                                    <td>{ v.email }</td>
                                                    <td>{ v.subject }</td>
                                                    <td>2025-01-15</td>
                                                    <td><span className="badge" style={{ backgroundColor: '#fff3cd', color: '#856404' }}>⏳ Pending</span></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
