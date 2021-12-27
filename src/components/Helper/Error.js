import React, { useEffect } from 'react'

export default function Error() {
    useEffect(() => {
        setTimeout(() => {
            document.location.href = "/"
        }, 10000);

    }, [])

    return (
        <div class="d-flex justify-content-center align-items-center" style={{height: '70vh'}}>
            <div class="d-flex justify-content-center align-items-center">
                <h1 class="mr-3 pr-3 align-top border-right inline-block align-content-center">404|</h1>
                <div class="inline-block align-middle">
                    <h2 class="font-weight-normal lead" id="desc">The page you requested was not found.</h2>
                </div>
            </div>
        </div>
    )
}
