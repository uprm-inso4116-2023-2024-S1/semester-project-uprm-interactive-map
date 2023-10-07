using System.Collections;
using System.Collections.Generic;
using System.Numerics;
using UnityEngine;
using UnityEngine.Rendering;
using Plane = UnityEngine.Plane;
using Vector3 = UnityEngine.Vector3;

public class CameraControl : MonoBehaviour
{
    //public GameObject parentModel; not used for now

    private float rotationSpeed = 500f;
    private Vector3 mouseWorldPosStart;
    private float zoomScale = 50f;
    private float maxFOV = 130f;
    private float minFOV = 30f;
    private float defaultFOV = 60f;
    private float cameraForceMultiplier = 50f;
    
    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(KeyCode.LeftShift) && Input.GetKey(KeyCode.Mouse2)) 
        {
            //CamOrbit(); not used for now
        }
        if (Input.GetKey(KeyCode.LeftShift) && Input.GetKey(KeyCode.F))
        {
            //FitToScreen(); not used for now
        }
        if (Input.GetMouseButtonDown(2) && !Input.GetKey(KeyCode.LeftShift))
        {
            //mouseWorldPosStart = GetPerspectivePos();
        }

        if (Input.GetMouseButtonDown(0))
        {
            GetComponent<Rigidbody>().velocity = Vector3.zero;
        }
        if (Input.GetMouseButton(0) && !Input.GetKey(KeyCode.LeftShift))
        {
            Pan();
        }
        if (Input.GetMouseButtonUp(0))
        {
            var rigidBody = GetComponent<Rigidbody>();
            rigidBody.AddForce(Camera.main.velocity * cameraForceMultiplier);
        }
        //TODO - figure out how these inputs can be made compatible for mobile
        Zoom(Input.GetAxis("Mouse ScrollWheel"));
    }

    private void CamOrbit()
    {
        if (Input.GetAxis("Mouse Y") != 0 || Input.GetAxis("Mouse X") != 0)
        {
            float verticalInput = Input.GetAxis("Mouse Y") * rotationSpeed * Time.deltaTime;
            float horizontalInput = Input.GetAxis("Mouse X") * rotationSpeed * Time.deltaTime;
            transform.Rotate(Vector3.right, -verticalInput);
            transform.Rotate(Vector3.up, horizontalInput, Space.World);
        }
    }

    private Bounds GetBound(GameObject parentGameObj)
    {
        Bounds bound = new Bounds(parentGameObj.transform.position, Vector3.zero);
        var rList = parentGameObj.GetComponentsInChildren(typeof(Renderer));
        foreach (Renderer r in rList)
        {
            bound.Encapsulate(r.bounds);
        }

        return bound;
    }
    /* not used for now
    public void FitToScreen()
    {
        Camera.main.fieldOfView = defaultFOV;
        Bounds bound = GetBound(parentModel);
        Vector3 boundSize = bound.size;
        float boundDiagonal = Mathf.Sqrt((boundSize.x * boundSize.x) + (boundSize.y * boundSize.y) + (boundSize.z * boundSize.z));
        float camDistanceToBoundCenter = boundDiagonal / 2f / (Mathf.Tan(Camera.main.fieldOfView / 2f * Mathf.Deg2Rad));
        float camDistanceToBoundWithOffset = camDistanceToBoundCenter + boundDiagonal / 2f - (Camera.main.transform.position - transform.position).magnitude;
        transform.position = bound.center + (-transform.forward * camDistanceToBoundWithOffset);
    }
    */

    private void Pan()
    {
        if (Input.GetAxis("Mouse Y") != 0 || Input.GetAxis("Mouse X") != 0)
        {
            Vector3 mouseWorldPosDiff = mouseWorldPosStart - GetPerspectivePos();
            transform.position += mouseWorldPosDiff;
        }
    }

    private void Zoom(float zoomDiff)
    {
        mouseWorldPosStart = GetPerspectivePos();
        if (zoomDiff != 0)
        {
            Camera.main.fieldOfView = Mathf.Clamp(Camera.main.fieldOfView - zoomDiff * zoomScale, minFOV, maxFOV);
            Vector3 mouseWorldPosDiff = mouseWorldPosStart - GetPerspectivePos();
            transform.position += mouseWorldPosDiff;
        }
    }
    public Vector3 GetPerspectivePos()
    {
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        Plane plane = new Plane(transform.forward, 0f);
        float dist;
        plane.Raycast(ray, out dist);
        return ray.GetPoint(dist);
    }
}
