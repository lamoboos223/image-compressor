import React from "react";
import compressor from "browser-image-compression";
import Card from "react-bootstrap/Card";

export default class imageCompressor extends React.Component {
    constructor() {
        super();
        this.state = {
          compressedLink:
            "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
          compressedImage:"",
          originalImage: "",
          originalLink: "",
          clicked: false,
          uploadImage: false
        };
    }

    handle = e => {
        const imageFile = e.target.files[0];
        this.setState({
            originalLink: URL.createObjectURL(imageFile),
            originalImage: imageFile,
            outputFileName: imageFile.name,
            uploadImage: true
        });
    };


    changeValue = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    click = e => {
        e.preventDefault();
    
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
          useWebWorker: true
        };
    
        if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
          alert("Image is too small, can't be Compressed!");
          return 0;
        }
    
        let output;
        compressor(this.state.originalImage, options).then(x => {
          output = x;
    
          const downloadLink = URL.createObjectURL(output);
          this.setState({
            compressedLink: downloadLink,
            compressedImage: output
          });
        });
    
        this.setState({ clicked: true });
        return 1;
      };

    render() {
        return (
            <div >
                
                {/* Display input image */}
                <div>
                    <Card style={{ width: '9rem' }}>
                        {this.state.uploadImage ? (
                        <div>
                            <Card.Title>name: { this.state.originalImage.name }</Card.Title>
                            <Card.Text>
                                {/* convert the image size from byte to megabyte */}
                                size: { this.state.originalImage.size /1024/1024 } MB
                            </Card.Text>
                            <Card.Img
                                variant="top"
                                src={this.state.originalLink}
                            ></Card.Img>
                        </div>
                        ) : (
                        <div>
                            <Card.Img
                                variant="top"
                                src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
                                >
                            </Card.Img>
                        </div>
                        )}
                    </Card>
                    {/* Choose file button */}
                    <div className="d-flex justify-content-center">
                    <input
                        type="file"
                        accept="image/*"
                        className="mt-2 btn btn-dark w-75"
                        onChange={e => this.handle(e)}
                    />
                    </div>
                </div>

                {/* compress image button */}
                <div>
                    <br />
                    {this.state.outputFileName ? (
                    <button
                        type="button"
                        className=" btn btn-dark"
                        onClick={e => this.click(e)}
                    >
                        Compress
                    </button>
                    ) : (
                    <></>
                    )}
                </div>

                {/* Display output image */}
                <div>
                        { this.state.clicked ?
                        (
                            <div>
                                {/* Download image link */}
                                <a
                                href={this.state.compressedLink}
                                download={this.state.outputFileName}
                                className="mt-2 btn btn-dark w-75"
                                >
                                Download {this.state.outputFileName}
                                </a>

                                {/* output image details */}
                                <Card.Text>size: { this.state.compressedImage.size/1024/1024 } MB</Card.Text>
                                <Card.Img variant="top" src={this.state.compressedLink}></Card.Img>
                            </div>
                        ):(
                            <></>
                        )
                    }
                </div>

            </div>
        );}
}