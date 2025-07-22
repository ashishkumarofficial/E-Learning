import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import basedUrl from "@/features/api/basedUrl";

const Emails = () => {
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = basedUrl();

  const param = useParams();

  const userId = param.userId; // Assuming userId is passed in the URL
  const addEmail = () => {
    const trimmed = emailInput.trim();
    if (trimmed && /\S+@\S+\.\S+/.test(trimmed)) {
      if (!emails.includes(trimmed)) {
        setEmails([...emails, trimmed]);
        setEmailInput("");
      } else {
        toast.error("Email already added");
      }
    } else {
      toast.error("Enter a valid email address");
    }
  };

  const removeEmail = (email) => {
    setEmails(emails.filter((e) => e !== email));
  };

  const sendInvites = async () => {
    if (emails.length === 0) {
      toast.error("Please add at least one email");
      return;
    }
    if (message.trim() === "") {
      toast.error("Please enter a message");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v1/messages/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          emails: emails,
          message: message,
        }), // Replace with actual user ID
      });

      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();
      setEmails(data.emails || []);
      setIsLoading(false);

      toast.success(`Invitations sent to ${emails.length} user(s)!`);
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to load emails");
    }

    setEmails([]);
    setMessage("");
  };
  
 

  return (
    <div className="flex flex-col gap-4 my-20 mx-auto max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div>
        <h2 className="text-lg font-semibold">Invite Users</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter email addresses and send course invitations.
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addEmail()}
          className=" dark:border-gray-700 "
        />
        <Button onClick={addEmail}>Add</Button>
      </div>

      {emails.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {emails.map((email) => (
            <span
              key={email}
              className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-sm px-3 py-1 rounded-full"
            >
              {email}
              <Trash2
                size={14}
                onClick={() => removeEmail(email)}
                className="cursor-pointer hover:text-red-500"
              />
            </span>
          ))}
        </div>
      )}

      <div>
        <Label htmlFor="message" className="block mb-3">
          Message
        </Label>
        <textarea
          id="message"
          className="w-full p-2 border dark:border-gray-700 rounded-md text-sm dark:bg-gray-800"
          placeholder="Write a short note..."
          rows={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button disabled={emails.length === 0} onClick={sendInvites}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          `Send ${emails.length} Invite${emails.length > 1 ? "s" : ""}`
        )}
      </Button>

    </div>
  );
};

export default Emails;
